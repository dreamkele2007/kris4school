import './style/';
import React,{Component} from 'react';
import {default as _Steps,Step} from 'antd/lib/steps';
class Steps extends Component{
	render(){
		return(
			<_Steps {...this.props}>{this.props.children}</_Steps>
			)
	}
}
Steps.Step = Step;
export default Steps;
