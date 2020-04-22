import React,{Component} from 'react';
import {default as _Card} from 'antd/lib/card';
class Card extends Component{
	render(){
		return(
			<_Card {...this.props}>{this.props.children}</_Card>
			)
	}
}

export default Card;
