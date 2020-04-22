import React,{Component} from 'react';
import {default as _Radio,Group,Button} from 'antd/lib/radio';
class Radio extends Component{
	render(){
		return(
			<_Radio {...this.props}>{this.props.children}</_Radio>
			)
	}
}
Radio.Button = Button;
Radio.Group = Group;
export default Radio;
