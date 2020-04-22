import React,{Component} from 'react';
import {default as _Popconfirm} from 'antd/lib/popconfirm';
class Popconfirm extends Component{
	render(){
		return(
			<_Popconfirm {...this.props}>{this.props.children}</_Popconfirm>
			)
	}
}

export default Popconfirm;
