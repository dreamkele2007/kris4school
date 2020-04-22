import './style/';
import React,{Component} from 'react';
import {default as _Upload,Dragger} from 'antd/lib/upload';
class Upload extends Component{
	render(){
		return(
			<_Upload {...this.props}>{this.props.children}</_Upload>
			)
	}
}
Upload.Dragger = Dragger;
export default Upload;
