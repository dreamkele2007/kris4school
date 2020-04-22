import React,{Component} from 'react';
import {default as _TimePicker} from 'antd/lib/time-picker';
class TimePicker extends Component{
	render(){
		return(
			<_TimePicker {...this.props}>{this.props.children}</_TimePicker>
			)
	}
}

export default TimePicker;
