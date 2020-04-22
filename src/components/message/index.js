import './style/';
import React,{Component} from 'react';
import {default as _Message,success,error,info,warning,warn,loading,config,destroy} from 'antd/lib/message';

class Message extends Component{
	render(){
		return(
			<_Message {...this.props}>{this.props.children}</_Message>
			)
	}
}
Message.success = success;
Message.error = error;
Message.info = info;
Message.warning = warning;
Message.warn = warn;
Message.loading = loading;
Message.config = config;
Message.destroy = destroy;
export default Message;
