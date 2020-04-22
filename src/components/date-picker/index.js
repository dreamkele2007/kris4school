import './style/';
import React,{Component} from 'react';
import {default as _DatePicker,MonthPicker,RangePicker} from 'antd/lib/date-picker';

class DatePicker extends Component{
	render(){
		return(
			<_DatePicker {...this.props}>{this.props.children}</_DatePicker>
			)
	}
}
DatePicker.MonthPicker=MonthPicker;
DatePicker.RangePicker=RangePicker;
export default DatePicker;
