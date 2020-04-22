import React,{Component} from 'react';
import {default as _Breadcrumb,Item} from 'antd/lib/breadcrumb';
class Breadcrumb extends Component{
	render(){
		return(
			<_Breadcrumb {...this.props}>{this.props.children}</_Breadcrumb>
			)
	}
}
Breadcrumb.Item=Item;
export default Breadcrumb;
