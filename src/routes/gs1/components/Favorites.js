import React from 'react';
import {Menu,Icon} from 'vdap-ui';
import { connect } from 'react-redux';
import  {sideNavPin} from 'actions/ui/uiAction';
import SideNavConfig from './SideNavConfig';

const SubMenu = Menu.SubMenu;

class Favorites extends React.Component{
  handleClick=()=>{
    console.log('handleClick');
      const {dispatch} = this.props;
      dispatch(sideNavPin(SideNavConfig.capital));
  }

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
            {item.selected ? <div style={{ position: 'absolute',right:'10px'}}></div>: ''}
            <div onClick={this.handleClick}>
              {item.icon
                ? <Icon type={item.icon}/>
                : ''}
              {item.name}
            </div>
          </Menu.Item>
        )
      }
    })
  };

  render(){

     let {sideCollapsed, menu,topmenu} = this.props.sideNavConfig;
     const menuItems = this.getMenus(menu, sideCollapsed);
    return (
      <div style={{zIndex:9999 }}>

         <Menu theme="light" mode="inline" defaultSelectedKeys={['two']} style={{height:'95vh',width:'200px',overflow: 'initial',backgroundColor:'white'}}>
          {topmenu?
              <Menu.Item key={topmenu.key}>
                <div style={{fontSize:'16px',color:'#666666'}}>{topmenu.name}</div>
              </Menu.Item>
              :''
          }
            {menuItems}
         </Menu>
      </div>
      )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    sideNavConfig:state.ui.sideNavConfig,
  };
}
export default connect(
  mapStateToProps
)(Favorites);
