import React,{Component} from 'react';
import {default as _Row} from 'antd/lib/row';
import {default as _Col} from 'antd/lib/col';
class Row extends Component{
	render(){
		return(
			<_Row {...this.props}>{this.props.children}</_Row>
			)
	}
}
class Col extends Component{
	render(){
		return(
			<_Col {...this.props}>{this.props.children}</_Col>
			)
	}
}

export {
  Row,
  Col,
};

