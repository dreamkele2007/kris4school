/**
 * Created by admin on 2017/7/7.
 */
import React, {Component} from 'react';
import {Button,DatePicker,Form,Select } from 'antd'
import taskMonitorFormProcesor from './taskMonitorFormProcesor';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const processor = new taskMonitorFormProcesor();
const Option = Select.Option;
class TaskMonitorFormViewer extends Component {
  state = {
    children:[]
  }
  handleSubmit =(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const rangeValue = fieldsValue['range-picker'];
      const taskName = fieldsValue['taskName'];
      console.log(rangeValue)
      const values = {
        'rangePicker': [rangeValue!=null&&rangeValue!==''?rangeValue[0].format('YYYY-MM-DD'):'', rangeValue!=null&&rangeValue!==''?rangeValue[1].format('YYYY-MM-DD'):''],
        'taskName':taskName,
      };
      processor.findTaskLog(this.props,null,values);
    });
  }
  drawTaskTypes() {
    const children = [];
    for (let i = 0; i < this.state.children.length; i++) {
      var obj = this.state.children[i];
      children.push(<Option key={obj.codeValue
      }>{obj.codeName}</Option>);
    }
    return children;
  }
  componentWillMount() {
    processor.findTaskLog(this.props,null,null);
    processor.modelChange(data=>{
      this.state.children=data.dataStores.result.rowDatas;
    });
  }

  render() {
    let children=this.drawTaskTypes();
    const { getFieldDecorator } = this.props.form;
    return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
          {/*<FormItem  label="任务名称">*/}
              {/*{getFieldDecorator('taskName', {*/}
              {/*})(*/}
                {/*<Input size="default" placeholder="任务名称"  style={{ width: 100 }} />*/}
              {/*)}*/}
            {/*</FormItem>*/}
            <FormItem  label="执行时间">
              {getFieldDecorator('range-picker', {
              })(
                <RangePicker />
              )}
            </FormItem>
            <FormItem  label="任务类型">
              {getFieldDecorator('taskName', {
              })(
                <Select allowClear={true} showSearch
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} style={{width: '122px'}}>
                  {children}
                </Select>
              )}
            </FormItem>
            <FormItem>
              <Button   type="primary" htmlType="submit">查询</Button>
            </FormItem>
        </Form>
    )
  }
}
const  taskMonitorFormViewer=Form.create()(TaskMonitorFormViewer);
export  default  taskMonitorFormViewer;
