import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Icon} from 'antd';


class SideNav extends Component {

  handleClick = (e) => {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  };
  getMenus = (menuArray, siderFold, parentPath) => {
    parentPath = parentPath || '/';
    if (!menuArray) return null;
    return menuArray.map(item => {
      if (item.child) {
        return (
          <li key={item.key} className={this.activeRoute(item.key)}
          >
            <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick}>
              {item.icon
                ? <Icon type={item.icon}/>
                : ''}
              {siderFold
                ? ''
                : item.name}
            </a>
            <ul className="nav-dropdown-items">
              {this.getMenus(item.child, siderFold, parentPath + item.key + '/')}
            </ul>

          </li>
        )
      } else {
        return (
          <li className="nav-item" key={item.key}>
            <NavLink to={parentPath + item.key} className="nav-link">
              {item.icon
                ? <Icon type={item.icon}/>
                : ''}
              {siderFold
                ? ''
                : item.name}
            </NavLink>
          </li>
        )
      }
    })
  };
  activeRoute(routeName) {
    return 'nav-item nav-dropdown';
    //return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  render() {
    let {sideCollapsed, handleClickNavMenu, location, menu} = this.props;
    console.log("SideNav....: sideCollapsed " + sideCollapsed);
    const menuItems = this.getMenus(menu, sideCollapsed);

    return (
      <nav className="sidebar-nav">
        <ul className="nav">
          <li className="nav-title">
            应用
          </li>
          <li className="nav-item">
            <NavLink to={'/app/dashboard'} className="nav-link" activeClassName="active"><i
              className="icon-speedometer"></i> Dashboard <span className="badge badge-info">NEW</span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/app/line'} className="nav-link"><i className="icon-speedometer"></i> Charts 2 </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/horizontal/dashboard'} className="nav-link"><i className="icon-speedometer"></i> Dashboard 3
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/app/account'} className="nav-link"><i className="icon-speedometer"></i> 我的报销单
            </NavLink>
          </li>
		  <li className="nav-item">
            <NavLink to={'/app/managerSelfSer'} className="nav-link"><i className="icon-speedometer"></i>经理自助
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/user'} className="nav-link"><i className="icon-speedometer"></i> 员工信息管理
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/supplier'} className="nav-link"><i className="icon-speedometer"></i> 供应商
            </NavLink>
          </li>
          <li className={this.activeRoute("/components")}>
            <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick}><i
              className="icon-puzzle"></i> Components</a>
            <ul className="nav-dropdown-items">
              <li className="nav-item">
                <NavLink to={'/components/buttons'} className="nav-link" activeClassName="active"><i
                  className="icon-puzzle"></i> Buttons</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={'/components/buttons'} className="nav-link" activeClassName="active"><i
                  className="icon-puzzle"></i> Buttons2</NavLink>
              </li>
            </ul>
          </li>
          {menuItems}
        </ul>
      </nav>
    )
  }
}

export default SideNav;

