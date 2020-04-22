import React,{Component} from 'react';
import {default as _Cascader} from 'antd/lib/cascader';
class Cascader extends Component{
	render(){
		return(
			<_Cascader {...this.props}>{this.props.children}</_Cascader>
			)
	}
}

export default Cascader;
