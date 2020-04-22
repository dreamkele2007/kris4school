import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import {Menu,Icon} from 'antd';
const SubMenu=Menu.SubMenu;

class SideNav extends Component {

  handleClick = (e) => {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  };
  getMenus = (menuArray, siderFold, parentPath) => {
    parentPath = parentPath || '/ui/';
    if (!menuArray) return null;
    return menuArray.map(item => {
      if (item.child) {
        return (
           <SubMenu key={item.key} title={<span> {item.icon? <Icon type={item.icon}/>: ''}<span>{item.name}</span></span>}>
              {this.getMenus(item.child, siderFold, parentPath + item.key + '/')}
           </SubMenu>

        )
      } else {
        return (
          <Menu.Item key={item.key}>

            <NavLink to={parentPath + item.key} >
              {item.icon
                ? <Icon type={item.icon}/>
                : ''}
              {item.name}
            </NavLink>
        </Menu.Item>
        )
      }
    })
  };

  render() {
    console.log("<<<<<<<<<<<<<<<");
    console.log(this.props);
     let {sideCollapsed, menu} = this.props.sideNavPin;
     const menuItems = this.getMenus(menu, sideCollapsed);

    return (
      <nav className="sidebar-nav">
      <img alt="example" src={require('assets/images/ui/1.png')} style={{position:'fixed',width:'240px',height:'60px',zIndex:999}} />
      <Menu theme="light" mode="inline" style={{height:'565px',overflow: 'initial',paddingTop:'60px'}}>

          {menuItems}
      </Menu>
      </nav>
    )
  }
}

export default SideNav;



