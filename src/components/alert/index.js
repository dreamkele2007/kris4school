import React,{Component} from 'react';
import {default as _Alert} from 'antd/lib/alert';

class Alert extends Component{
	render(){
		return(
			<_Alert {...this.props}>{this.props.children}</_Alert>
			)
	}
}

export default Alert;
