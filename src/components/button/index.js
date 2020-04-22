import React,{Component} from 'react';
import {default as _Button} from 'antd/lib/button/button';
import ButtonGroup from 'antd/lib/button/button-group';
import './style/';
class Button extends Component{

	render(){
		return(
			<_Button {...this.props}>{this.props.children}</_Button>
			)
	}
}

Button.Group = ButtonGroup;

export default Button;
