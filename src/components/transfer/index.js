import React,{Component} from 'react';
import {default as _Transfer} from 'antd/lib/transfer';
class Transfer extends Component{
	render(){
		return(
			<_Transfer {...this.props}>{this.props.children}</_Transfer>
			)
	}
}

export default Transfer;
