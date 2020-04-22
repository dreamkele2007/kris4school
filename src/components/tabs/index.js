import './style/';
import React,{Component} from 'react';
import {default as _Tabs,TabPane} from 'antd/lib/tabs';
class Tabs extends Component{
	render(){
		return(
			<_Tabs {...this.props}>{this.props.children}</_Tabs>
			)
	}
}
 Tabs.TabPane=TabPane;
export default Tabs;
