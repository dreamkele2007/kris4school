import React,{Component} from 'react';
import {default as _Dropdown,Button} from 'antd/lib/dropdown';
class Dropdown extends Component{
	render(){
		return(
			<_Dropdown {...this.props}>{this.props.children}</_Dropdown>
			)
	}
}
Dropdown.Button = Button;
export default Dropdown;
