import './style/';
import React,{Component} from 'react';
import {default as _Pagination} from 'antd/lib/pagination';
class Pagination extends Component{
	render(){
		return(
			<_Pagination {...this.props}>{this.props.children}</_Pagination>
			)
	}
}

export default Pagination;
