/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import {Form, Table, Button, Modal, Input, Select, notification, InputNumber} from 'antd';
import 'antd/dist/antd.css';
import taskModelProcessor from './taskModelProcessor';
import managerProcessor from './taskManagerProcessor';
const Option = Select.Option;
// 表单项
const processor = new taskModelProcessor();
const managerProssor = new managerProcessor();
const openNotificationWithIcon = (type, msg) => {
  notification[type]({
    message: msg,
    // description: msg,
    placement: 'bottomRight'
  });
};
// 任务管理主页面
class EditTaskButtonViewer extends React.Component {
  // 声明state
  state = {
    disabled:false,
    data:[],
    initData : []
  };

  // model取消
  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  // 修改任务
  updateTask = () => {
    var selectedRowKeys =this.props.selectedRowKeys;
    var record = this.props.record;
    // 校验
    if (selectedRowKeys.length !== 1) {
      openNotificationWithIcon('warning', '请选中一条数据进行修改！');
      return;
    }
    // if(selectedRowData[0].isRun=='1'){
    //     openNotificationWithIcon('warning', '请先停止任务再修改！');
    //     return;
    // }
    // 填充form数据
    var arr = record[0].crontab.split(' ');
    this.props.form.setFieldsValue({
      taskName: record[0].taskName,
      taskType: record[0].taskType,
      second: arr[0],
      mini: arr[1],
      hour: arr[2],
      day: arr[3],
      month: arr[4],
      week: arr[5],
    })
    this.setState({
      initData : [
        {
          taskName: record[0].taskName,
          taskType: record[0].taskType,
          second: arr[0],
          mini: arr[1],
          hour: arr[2],
          day: arr[3],
          month: arr[4],
          week: arr[5],
        }]
    })
    // 显示model
    this.setState({
      visible: true
    });
  }

  // 填充下拉框
  drawTaskTypes() {
    const children = [];
    for (let i = 0; i < this.props.dictType.length; i++) {
      var obj = this.props.dictType[i];
      children.push(<Option key={obj.codeValue}>{obj.codeName}</Option>);
    }
    return children;
  }

  // model确定
  saveModel = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if(!err){
        processor.addOrUpdateTask(this.props.record[0],fieldsValue,data =>{
          if (data.header.code === 1) {
            openNotificationWithIcon('success', data.parameters.result);
            managerProssor.handleTableChange(null,this.props);
          } else {
            openNotificationWithIcon('error', '保存失败!');
          }
          this.setState({visible:false});
        });
      }else {
        openNotificationWithIcon('warning', '请检查数据是否完整!');
      }
    });
  }

  onChange=(strValue,value)=>{
    if (value!==undefined){
      switch (strValue)
      {
        case 'second':
          if(value===-1){
            this.props.form.setFieldsValue({
              second:'*'
            })
          }else{
            this.props.form.setFieldsValue({
              second:value
            })
          }
          break;
        case 'mini':
          if(value===-1){
            this.props.form.setFieldsValue({
              mini:'*'
            })
          }else{
            this.props.form.setFieldsValue({
              mini:value
            })
          }
          break;
        case 'hour':
          if(value===-1){
            this.props.form.setFieldsValue({
              hour:'*'
            })
          }else{
            this.props.form.setFieldsValue({
              hour:value
            })
          }
          break;
        case 'day':
          if (value===0){
            this.props.form.setFieldsValue({
              day:'*'
            })
          }else if (value===-1){
            this.props.form.setFieldsValue({
              day:'?'
            })
          }else {
            this.props.form.setFieldsValue({
              day:value
            })
          }
          this.props.form.setFieldsValue({
            week:'?'
          })
          break;
        case 'month':
          if(value===0){
            this.props.form.setFieldsValue({
              month:'*'
            })
          }else{
            this.props.form.setFieldsValue({
              month:value
            })
          }
          break;
        case 'week':
          if (value===0){
            this.props.form.setFieldsValue({
              week:'*'
            })
          }else if (value===-1){
            this.props.form.setFieldsValue({
              week:'?'
            })
          }else {
            this.props.form.setFieldsValue({
              week:value
            })
          }
          this.props.form.setFieldsValue({
            day:'?'
          })
          break;
        default:
      }
    }
  }


  render() {
    const {getFieldProps} = this.props.form
    let childrenTaskTypes = this.drawTaskTypes();
    const columns = [
      {
        title: '任务名称',
        dataIndex: 'taskName',
        key: 'taskName',
        className:'column-money',
        render: (value, item) => (
          <Input {...getFieldProps(`taskName`, {rules: [{ required: true, message: '不能为空' }],initialValue: value})}
                 style={{width: 120}} />
        ),
      },
      {
        title: '任务类型',
        dataIndex: 'taskType',
        key: 'taskType',
        className:'column-money',
        render: (value, item) => (
          <Select {...getFieldProps(`taskType`, {rules: [{ required: true, message: '不能为空' }],initialValue: value})}
                  style={{width: 120}}>
            {childrenTaskTypes}
          </Select>
        ),
      },
      {
        title: 'Cron表达式',
        key: 'cron',
        children: [{
          title: '秒',
          dataIndex: 'second',
          key: 'second',
          render: (value, item) => (
            <InputNumber {...getFieldProps('second', {rules: [{ required: true, message: '不能为空'}],initialValue: value})}
                         style={{width: 60}}  min={-1} max={59} step={1}
                         formatter={value => {if(value===-1){return '*'}else {return value}}}
                         parser={value => value.replace('*', -1)}
                         onChange={(value)=>this.onChange('second',value)}/>
          )
        },{
          title: '分',
          dataIndex: 'mini',
          key: 'mini',
          className:'column-money',
          render: (value, item) => (
            <InputNumber {...getFieldProps('mini', {rules: [{ required: true, message: '不能为空' }],initialValue: value})}
                         style={{width: 60}}  min={-1} max={59} step={1}
                         formatter={value => {if(value===-1){return '*'}else {return value}}}
                         onChange={(value)=>this.onChange('mini',value)}/>
          )
        },{
          title: '时',
          dataIndex: 'hour',
          key: 'hour',
          className:'column-money',
          render: (value, item) => (
            <InputNumber {...getFieldProps('hour', {rules: [{ required: true, message: '不能为空' }],initialValue: value})}
                         style={{width: 60}} min={-1} max={23} step={1}
                         formatter={value => {if(value===-1){return '*'}else {return value}}}
                         onChange={(value)=>this.onChange('hour',value)}/>
          )
        },{
          title: '日',
          dataIndex: 'day',
          key: 'day',
          className:'column-money',
          render: (value, item) => (
            <InputNumber {...getFieldProps('day', {rules: [{ required: true, message: '不能为空' }],initialValue: value})}
                         style={{width: 60}} min={0} max={30} step={1}
                         formatter={value => {if(value===0){return '*'}else if(value===-1){return '?'} else {return value}}}
                         onChange={(value)=>this.onChange('day',value)}/>
          )
        },{
          title: '月',
          dataIndex: 'month',
          key: 'month',
          className:'column-money',
          render: (value, item) => (
            <InputNumber {...getFieldProps(`month`, {rules: [{ required: true, message: '不能为空' }],initialValue: value})}
                         style={{width: 60}} min={0} max={12} step={1}
                         formatter={value => {if(value===0){return '*'}else {return value}}}
                         onChange={(value)=>this.onChange('month',value)}/>
          )
        },{
          title: '周',
          dataIndex: 'week',
          key: 'week',
          className:'column-money',
          render: (value, item, idx) => (
            <InputNumber {...getFieldProps(`week`, {rules: [{ required: true, message: '不能为空' }],initialValue: value})}
                         style={{width: 60}}  min={0} max={7} step={1}
                         formatter={value => {if(value===0){return '*'}else if(value===-1){return '?'} else {return value}}}
                         onChange={(value)=>this.onChange('week',value)}/>
          )
        }
        ]
      }]
    return (
      <div style={{display:'inline-block'}}>
        <Button type="primary" onClick={() => this.updateTask()}>修改</Button>&nbsp;
        <Modal
            maskClosable={false}
            title="任务信息"
            width={900}
            visible={this.state.visible}
            onOk={this.saveModel}
            onCancel={this.handleCancel}
            okText="确认修改"
          >
            <Form layout="inline">
              <Table bordered dataSource={this.state.initData} columns={columns} pagination={false}/>
            </Form>
          </Modal>
      </div>
    );
  }
}

const EditTaskButtonMainViewer = Form.create()(EditTaskButtonViewer);
export default EditTaskButtonMainViewer
