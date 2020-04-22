import React,{Component} from 'react';
import {default as _Rate} from 'antd/lib/rate';
class Rate extends Component{
	render(){
		return(
			<_Rate {...this.props}>{this.props.children}</_Rate>
			)
	}
}

export default Rate;
