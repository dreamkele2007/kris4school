import React,{Component} from 'react';
import {default as _Select} from 'antd/lib/select';
import {Option,OptGroup} from 'antd/lib/select';

class Select extends Component{
	render(){
		return(
			<_Select {...this.props}>{this.props.children}</_Select>
			)
	}
}
Select.Option = Option;
Select.OptGroup = OptGroup;
export default Select;
