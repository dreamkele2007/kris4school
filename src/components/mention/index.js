import React,{Component} from 'react';
import {default as _Mention,Nav} from 'antd/lib/mention';
class Mention extends Component{
	render(){
		return(
			<_Mention {...this.props}>{this.props.children}</_Mention>
			)
	}
}
Mention.Nav = Nav;
export default Mention;
