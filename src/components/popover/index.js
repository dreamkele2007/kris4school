import React,{Component} from 'react';
import {default as _Popover} from 'antd/lib/popover';
class Popover extends Component{
	render(){
		return(
			<_Popover {...this.props}>{this.props.children}</_Popover>
			)
	}
}

export default Popover;
