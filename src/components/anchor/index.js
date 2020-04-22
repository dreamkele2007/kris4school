import React,{Component} from 'react';
import {default as _Anchor,Link} from 'antd/lib/anchor';

class Anchor extends Component{
	render(){
		return(
			<_Anchor {...this.props}>{this.props.children}</_Anchor>
			)
	}
}
Anchor.Link = Link;
export default Anchor;
