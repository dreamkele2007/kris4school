import React,{Component} from 'react';
import {default as _Avatar} from 'antd/lib/avatar';

class Avatar extends Component{
	render(){
		return(
			<_Avatar {...this.props}>{this.props.children}</_Avatar>
			)
	}
}

export default Avatar;
