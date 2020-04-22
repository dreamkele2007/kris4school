import './style/';
import React,{Component} from 'react';
import {default as _Modal} from 'antd/lib/modal';
import {info,success,error,warning,confirm} from 'antd/lib/modal';
class Modal extends Component{
	render(){
		return(
			<_Modal {...this.props}>{this.props.children}</_Modal>
			)
	}
}
Modal.info = info;
Modal.success = success;
Modal.error = error;
Modal.warning = warning;
Modal.confirm = confirm;
export default Modal;
