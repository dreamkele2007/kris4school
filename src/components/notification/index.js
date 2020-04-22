import React,{Component} from 'react';
import {default as _Notification} from 'antd/lib/notification';
import {success,error,info,warning,warn,close,destroy} from 'antd/lib/notification';
class Notification extends Component{
	render(){
		return(
			<_Notification {...this.props}>{this.props.children}</_Notification>
			)
	}
}
Notification.success = success;
Notification.error = error;
Notification.info = info;
Notification.warning = warning;
Notification.warn = warn;
Notification.close = close;
Notification.destroy = destroy;
export default Notification;
