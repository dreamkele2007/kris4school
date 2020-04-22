import React,{Component} from 'react';
import {default as _InputNumber} from 'antd/lib/input-number';
class InputNumber extends Component{
	render(){
		return(
			<_InputNumber {...this.props}>{this.props.children}</_InputNumber>
			)
	}
}

export default InputNumber;
