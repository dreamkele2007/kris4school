import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom'
import {Menu} from 'vdap-ui';

const data = [
  {
    "key": 1,
    "icon": "appstore",
    "title": "软件测试科",
    "url": "",
    "children": [
      {
        "key": 4,
        "title": "广电组",
        "url": "",
        "children": [
          {
            "key": 8,
            "title": "客制化",
            "url": "",
            "children": [
              {
                "key": 19,
                "title": "版本测试",
                "url": "http://www.baidu.com"
              }
            ]
          }, {
            "key": 9,
            "title": "客供",
            "url": ""
          }
        ]
      }, {
        "key": 5,
        "title": "光通组",
        "url": "",
        "children": [
          {
            "key": 16,

            "title": "版本测试",
            "url": ""
          }
        ]
      }
    ]
  }, {
    "key": 2,
    "icon": "setting",
    "title": "硬件测试科",
    "url": ""
  }, {
    "key": 3,
    "icon": "mail",
    "title": "EMC测试科",
    "url": ""
  }
];

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }
  recursion=(dataSource)=> {
    return (
      dataSource.map((menu, index) => {
        if (menu.children) {
          return (
            <Menu.SubMenu key={menu.key} title={menu.title}>
              {this.recursion(menu.children)}
            </Menu.SubMenu>
          )
        } else {
          return (<Menu.Item key={menu.key}>{menu.url?<a href={menu.url} target="_blank">{menu.title}</a>:menu.title}</Menu.Item>)
        }
      })
    )
  }
  render() {
    const {match} = this.props;
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <Link to={`${match.url}/dashboard`} className="nav-link" activeClassName="active"><i className="icon-speedometer"></i> 概览 <span className="badge badge-info">NEW</span></Link>
            </li>
            <li className="nav-title">
              网站管理
            </li>
            <li className="nav-item">
              <Link to={`${match.url}/sites`} className="nav-link" activeClassName="active"><i className="icon-pie-chart"></i> 站点管理</Link>
            </li>
            <li className="nav-item">
              <Link to={`${match.url}/users`} className="nav-link" activeClassName="active"><i className="icon-pie-chart"></i> 用户管理</Link>
            </li>
            <li className="nav-item">
              <Link to={`${match.url}/security`} className="nav-link" activeClassName="active"><i className="icon-pie-chart"></i> 验证授权</Link>
            </li>
            <li className="divider"></li>
            <li className="nav-title">
              应用管理
            </li>
            <li className="nav-item">
              <Link to={`${match.url}/pages`} className="nav-link" activeClassName="active"><i className="icon-pie-chart"></i> 页面定义</Link>
            </li>
          </ul>
        </nav>
        <div style={{backgroundColor:'#fff'}}>
          <Menu
            mode="inline"
            theme="light"
            style={{ width: 240 }}
          >
            {
              this.recursion(data)
            }
          </Menu>
        </div>

      </div>
    )
  }
}

export default Sidebar;
