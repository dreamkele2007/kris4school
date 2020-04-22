import React,{Component} from 'react';
import {default as _Input} from 'antd/lib/input';
import {Group,TextArea} from 'antd/lib/input';
import {Search} from 'antd/lib/input';

class Input extends Component{
	render(){
		return(
			<_Input {...this.props}>{this.props.children}</_Input>
			)
	}
}
Input.Group=Group;
Input.Search=Search;
Input.TextArea=TextArea;
export default Input;
