import './style/';
import React,{Component} from 'react';
import {default as _Progress} from 'antd/lib/progress';
class Progress extends Component{
	render(){
		return(
			<_Progress {...this.props}>{this.props.children}</_Progress>
			)
	}
}

export default Progress;
