/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Form,Button,DatePicker} from 'antd';
import 'antd/dist/antd.css';
import DatePickerProcessor from './DatePickerProcessor'
const processor = new DatePickerProcessor();
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
class DatePickerViewer extends React.Component {
  state = {
    selectedRowKeys:[],
  };
  componentWillMount() {
    processor.seach(null,null,this.props)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props);
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const rangeValue = fieldsValue['range-picker'];
      const values = {
        'rangePicker': [rangeValue!=null&&rangeValue!==''?rangeValue[0].format('YYYY-MM-DD'):'', rangeValue!=null&&rangeValue!==''?rangeValue[1].format('YYYY-MM-DD'):''],
      };
      console.log('Received values of form: ', values);
      processor.seach({total:0,pageSize:10,current:1,defaultCurrent:1},values,this.props);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div style={{display:'inline-block'}}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            label="上传日期"
          >
            {getFieldDecorator('range-picker')(
              <RangePicker format='YYYY-MM-DD'/>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">查询</Button>
          </FormItem>
          {/*<FormItem>*/}
          {/*<Button size="default"  type="primary" icon="download"><a  href={this.props.url}  style={{ fontSize: 12, color: '#fffbf7' }} >&nbsp;下载模板</a></Button>*/}
          {/*</FormItem>*/}
        </Form>
      </div>
    );
  }
}
DatePickerViewer=Form.create()(DatePickerViewer);

export default DatePickerViewer;

