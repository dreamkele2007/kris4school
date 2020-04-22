import React from 'react';
import {DatePicker} from 'vdap-ui';
import moment from 'moment';

class DatePickerSingle extends React.Component {
  render() {

    const {MonthPicker, RangePicker} = DatePicker;
    const dateFormat = 'YYYY/MM/DD';
    const monthFormat = 'YYYY/MM';

    return (
      <div>
        <h6 style={{margin:'20px 0 10px'}}>DatePicker日期选择框-单日期</h6>
        <p style={{margin:'10px 0  30px'}}>当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。</p>

        <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat}/>
      </div>
    )
  }
}

export default DatePickerSingle;
