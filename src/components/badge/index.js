import './style';
import React,{Component} from 'react';
import {default as _Badge} from 'antd/lib/badge';

class Badge extends Component{
	render(){
		return(
			<_Badge {...this.props}>{this.props.children}</_Badge>
			)
	}
}

export default Badge;
