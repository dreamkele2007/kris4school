import React,{Component} from 'react';
import {default as _Switch} from 'antd/lib/switch';
class Switch extends Component{
	render(){
		return(
			<_Switch {...this.props}>{this.props.children}</_Switch>
			)
	}
}

export default Switch;
