import React, {Component} from 'react';

import {Menu, Dropdown, Icon} from 'antd';
import { Link} from 'react-router-dom';
// import {togglSidebarMinimize, toggleAsideHidden} from '@vdap/core';

import AppSwitch from './AppSwitch';
class Header extends Component {

  constructor(props) {
    super(props);


  }


  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize = (e) => {
    e.preventDefault();
    const {dispatch, sideCollapsed} = this.props;
    console.log("Header点击....togglSidebarMinimize");
    // dispatch(togglSidebarMinimize(!sideCollapsed));
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle = (e) => {
    e.preventDefault();
    const {dispatch, hideAside} = this.props;

    // dispatch(toggleAsideHidden(!hideAside));
    document.body.classList.toggle('aside-menu-hidden');
  }


  render() {
    const userMenu = (
      <Menu>
        <Menu.Item key="1">个人信息</Menu.Item>
        <Menu.Item key="2">帐户设置</Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="3">注销</Menu.Item>

      </Menu>
    );


    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" onClick={this.mobileSidebarToggle}
                type="button">&#9776;</button>
        <a className="navbar-brand" href="/"></a>
        <ul className="nav navbar-nav d-md-down-none">
          <li className="nav-item">
            <a className="nav-link navbar-toggler sidebar-toggler" onClick={this.sidebarMinimize} href="/">&#9776;</a>
          </li>
          <li className="nav-item px-3">
            <Link className="nav-link" to="/">主页</Link>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/">联系人</a>
          </li>
          <li className="nav-item px-3">
            <Link className="nav-link" to="/admin">网站管理</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="/"><i className="icon-bell"></i><span
              className="badge badge-pill badge-danger">5</span></a>
          </li>


          <li className="nav-item">

              <a className=" nav-link " >
                <img src={process.env.PUBLIC_URL+'/assets/images/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span className="d-md-down-none">admin</span>
              </a>

          </li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link navbar-toggler aside-menu-toggler" onClick={this.asideToggle} href="/">&#9776;</a>
          </li>
        </ul>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  fixedSide: state.settings.fixedSide,
  sideCollapsed: state.settings.sideCollapsed,
  fixedAside: state.settings.fixedAside,
  fixedHeader: state.settings.fixedHeader,
  hideAside: state.settings.hideAside,
  sidebarWidth: state.settings.sidebarWidth,
  theme: state.settings.theme,
});


// export default connect(
//   mapStateToProps,
// )(Header);

export default Header
