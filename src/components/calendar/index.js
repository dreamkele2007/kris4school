import React,{Component} from 'react';
import {default as _Calendar} from 'antd/lib/calendar';
class Calendar extends Component{
	render(){
		return(
			<_Calendar {...this.props}>{this.props.children}</_Calendar>
			)
	}
}

export default Calendar;
