import './style/';
import React,{Component} from 'react';
import {default as _Menu} from 'antd/lib/menu';
import {Divider,Item,SubMenu,ItemGroup} from 'antd/lib/menu';

class Menu extends Component{
	render(){
		return(
			<_Menu {...this.props}>{this.props.children}</_Menu>
			)
	}
}
Menu.Divider = Divider;
Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;
export default Menu;
