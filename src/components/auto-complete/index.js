import React,{Component} from 'react';
import {default as _AutoComplete,Option,OptGroup} from 'antd/lib/auto-complete';

class AutoComplete extends Component{
	render(){
		return(
			<_AutoComplete {...this.props}>{this.props.children}</_AutoComplete>
			)
	}
}
AutoComplete.Option = Option;
AutoComplete.OptGroup = OptGroup;
export default AutoComplete;
