// import BackTop from 'antd/lib/back-top';
import React,{Component} from 'react';
import {default as _BackTop} from 'antd/lib/back-top';

class BackTop extends Component{
	render(){
		return(
			<_BackTop {...this.props}>{this.props.children}</_BackTop>
			)
	}
}

export default BackTop;
