import React,{Component} from 'react';
import {default as _Tooltip} from 'antd/lib/tooltip';
class Tooltip extends Component{
	render(){
		return(
			<_Tooltip {...this.props}>{this.props.children}</_Tooltip>
			)
	}
}

export default Tooltip;
