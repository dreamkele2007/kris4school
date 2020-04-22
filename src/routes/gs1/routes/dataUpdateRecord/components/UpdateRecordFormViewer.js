/**
 * Created by admin on 2017/7/7.
 */
import React, {Component} from 'react';
import {Button,DatePicker,Form,Select } from 'antd'
import  updateRecordFormProcesor from './updateRecordFormProcesor';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const pro=new updateRecordFormProcesor();
const Option = Select.Option;

class UpdateRecordFormViewer extends Component {
  componentDidMount() {
    pro.findUpdateInfo(this.props,null);
  }
  // 状态下拉框
  drawTaskTypes() {
    const children = [];
    for (let i = 0; i < this.props.statusType.length; i++) {
      var obj = this.props.statusType[i];
      children.push(<Option key={obj.codeValue}>{obj.codeName}</Option>);
    }
    return children;
  }

  // 查询
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const rangeValue = fieldsValue['range-picker'];
      const status = fieldsValue['status'];
      const downType = fieldsValue['downType'];
      const values = {
        'rangePicker': [rangeValue!=null&&rangeValue!==''?rangeValue[0].format('YYYY-MM-DD'):'', rangeValue!=null&&rangeValue!==''?rangeValue[1].format('YYYY-MM-DD'):''],
        'status':status,
        'downType':downType,
      };
      pro.findUpdateInfo(this.props,values);
    });
  }
  render()
  {
    const { getFieldDecorator } = this.props.form;
    let childrenTaskTypes = this.drawTaskTypes();
    return(
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="更新时间">
          {getFieldDecorator('range-picker','')(
            <RangePicker/>
          )}
        </FormItem>
        <FormItem label="更新类型">
          {getFieldDecorator('downType', {
          })(
            <Select allowClear={true} style={{width: '100px'}}>
              <Option value="0">自动</Option>
              <Option value="1">手动</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="状态">
          {getFieldDecorator('status', {
          })(
            <Select allowClear={true}  style={{width: '100px'}}>
              {childrenTaskTypes}
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">查询</Button>
        </FormItem>
      </Form>
    );
  }
}
const  updateRecordFormViewer=Form.create()(UpdateRecordFormViewer);
export  default  updateRecordFormViewer;
