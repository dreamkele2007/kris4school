import React,{Component} from 'react';
import {default as _Affix} from 'antd/lib/affix';

class Affix extends Component{
	render(){
		return(
			<_Affix {...this.props}>{this.props.children}</_Affix>
			)
	}
}

export default Affix;
