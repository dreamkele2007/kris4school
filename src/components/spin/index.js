import './style/';
import React,{Component} from 'react';
import {default as _Spin} from 'antd/lib/spin';
class Spin extends Component{
	render(){
		return(
			<_Spin {...this.props}>{this.props.children}</_Spin>
			)
	}
}

export default Spin;
