import React,{Component} from 'react';
import {default as _Checkbox,Group} from 'antd/lib/checkbox';
class Checkbox extends Component{
	render(){
		return(
			<_Checkbox {...this.props}>{this.props.children}</_Checkbox>
			)
	}
}
Checkbox.Group = Group;
export default Checkbox;
