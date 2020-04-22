/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Form, Button,Popconfirm,notification,DatePicker} from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import checkResultFormProcessor from './checkResultFormProcessor'
const pro = new checkResultFormProcessor();
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const openNotificationWithIcon = (type, msg) => {
  notification[type]({
    message: '通知消息',
    description: msg,
    placement: 'bottomRight'
  });
};
class CheckResultFormViewer extends React.Component {

  //通过
  pass =() =>{
    if(this.props.selectedRowKeys.length!=1){
      openNotificationWithIcon('warning', '请选中一条数据！');
      return;
    }
    var record = this.props.record;
    for(var i=0;i<record.length;i++){
      if(record[i].status==="2"){
        openNotificationWithIcon('warning', '所选数据已入库,无需重复操作！');
        return;
      }
      if(record[i].status==="3"){
        openNotificationWithIcon('warning', '所选数据已作废,不允许通过操作！');
        return;
      }
    }
    // 开启遮罩
    this.props.changeLoading(true);
    // 发送通过请求
    pro.passUpdataInfo(record,data =>{
      if (data.header.code == 1) {
        openNotificationWithIcon('success', data.parameters.result);
        // 通过成功关闭遮罩
        this.props.changeLoading(false);
        pro.findUpdateInfo(this.props,this.props.condition);
      } else {
        openNotificationWithIcon('error', '操作失败!');
      }
    });
  }
  // 不通过
  unPass =()=>{
    var record = this.props.record;
    if(this.props.selectedRowKeys.length!=1) {
      openNotificationWithIcon('warning', '请选中一条数据！');
      return;
    }
    for(var i=0;i< record.length ; i++){
      var status =  record[i].status;
      if(status==="3"){
        openNotificationWithIcon('warning', '所选数据已作废,无需重复操作！');
        return;
      }
      if(status==="2"){
        openNotificationWithIcon('warning', '所选数据已入库,不允许作废操作！');
        return;
      }
    }
    pro.unPassUpdataInfo(record,data=>{
      if (data.header.code == 1) {
        openNotificationWithIcon('success', data.parameters.result);
        pro.findUpdateInfo(this.props,this.props.condition);
      } else {
        openNotificationWithIcon('error', '操作失败!');
      }
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const rangeValue = fieldsValue['range-picker'];
      const values = {
        rangeTimeStart:rangeValue!=null&&rangeValue!=''?rangeValue[0].format('YYYY-MM-DD'):'',
        rangeTimeEnd:rangeValue!=null&&rangeValue!=''?rangeValue[1].format('YYYY-MM-DD'):''
      };
      pro.findUpdateInfo(this.props,values);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const rangeConfig = {
      rules: [{ type: 'array', required: false, message: 'Please select time!' }],
    };
    return(
        <div>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem label="更新时间">
              {getFieldDecorator('range-picker', rangeConfig)(
                <RangePicker/>
              )}
            </FormItem>
            <FormItem>
              <Button  type="primary" htmlType="submit">查询</Button>
            </FormItem>
            <span style={{float:'right',marginTop:5}}>
              <Popconfirm title="确认不通过吗?" onConfirm={() => this.unPass()}>
                <Button   type="primary">不通过</Button>
              </Popconfirm>
            </span>
            <span style={{float:'right',marginRight:3,marginTop:5}}>
              <Popconfirm title="确认通过吗?" onConfirm={() => this.pass()}>
                <Button   type="primary">通过</Button>
              </Popconfirm>
            </span>
          </Form>
        </div>
    );
  }
}
const  checkResultFormViewer=Form.create()(CheckResultFormViewer);


const mapStateToProps = (store) => {
  return {
    condition:store.checkResultReducer.condition,
  }
};
export default connect(
  mapStateToProps
)(checkResultFormViewer);
// export default checkResultFormViewer;
