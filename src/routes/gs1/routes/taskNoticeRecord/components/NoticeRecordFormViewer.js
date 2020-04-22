/**
 * Created by admin on 2017/7/7.
 */
import React, {Component} from 'react';
import {Button,DatePicker,Form,Select } from 'antd'
import noticeRecordFormProcesor from './noticeRecordFormProcesor';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const Option = Select.Option;
const processor =new noticeRecordFormProcesor();
const data =[];
class NoticeRecordFormViewer extends Component {


  state = {
    data,
    pagination:{pageSize:10},
  }
  componentWillMount() {
    processor.queryDomainDrop(data => {
      //下面的就是请求来的数据
      var result = data.getSingleDataStore();
      this.setState({
        data:result.rowDatas[0].result
      })
    });
    processor.queryNoticeRecordForm({total:0,pageSize:10,current:1,defaultCurrent:1},'',this.props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      processor.queryNoticeRecordForm({total:0,pageSize:10,current:1,defaultCurrent:1},fieldsValue,this.props);
    });
  }

  drawTaskTypes() {
    const children = [];
    for (let i = 0; i < this.state.data.length; i++) {
      var obj = this.state.data[i];
      children.push(<Option key={obj.domainId}>{obj.hospitalName}</Option>);
    }
    return children;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const children=this.drawTaskTypes();
    return (
      <span>
        <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem  label="通知时间">
               {getFieldDecorator('time','')(
                 <RangePicker format={dateFormat}/>
               )}
              {/*{getFieldDecorator('time', {*/}
              {/*})(*/}
                {/*<RangePicker*/}
                  {/*defaultValue={[moment('2017/08/01', dateFormat), moment('2017/08/01', dateFormat)]}*/}
                  {/*format={dateFormat}*/}
                {/*/>*/}
              {/*)}*/}
            </FormItem>
            <FormItem  label="租户">
              {getFieldDecorator('domainId', {
              })(

                <Select allowClear={true} showSearch
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} style={{width: '122px'}} >
                  {children}
                </Select>
              )}
            </FormItem>
            <FormItem>
              <Button   type="primary" htmlType="submit">查询</Button>
            </FormItem>
        </Form>
      </span>
    )
  }
}
const  noticeRecordFormViewer=Form.create()(NoticeRecordFormViewer);
export  default  noticeRecordFormViewer;
