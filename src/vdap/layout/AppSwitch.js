import React, {Component} from 'react';
import {Dropdown, Menu, Icon} from 'vdap-ui';


const MenuItem = Menu.Item;
class AppSwitch extends Component {

  renderItem(item) {
     return (
      <MenuItem key={item.key}>
        {item.icon
          ? <Icon type={item.icon}/>
          : ''}
        {item.name}
      </MenuItem>
    )
  }

  render() {
    const {menu} = this.props;
    const appMenu = (
      <Menu>

        {
          menu.map((item) => {
          return this.renderItem(item)
        })
        }
      </Menu>
    );
    return (
      <Dropdown overlay={appMenu} trigger={['click']}>
        <a className=" nav-link dropdown-toggle" data-toggle="dropdown"
           role="button" aria-haspopup="true">
          <i className="icon-list"></i>
        </a>
      </Dropdown>
    )
  }
}

export default AppSwitch;
