import React,{Component} from 'react';
import {default as _Icon} from 'antd/lib/icon';
class Icon extends Component{
	render(){
		return(
			<_Icon {...this.props}>{this.props.children}</_Icon>
			)
	}
}

export default Icon;
