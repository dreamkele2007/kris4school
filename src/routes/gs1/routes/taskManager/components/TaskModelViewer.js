/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import {Form,Table,Button,Modal,Input,Popconfirm,Select,notification,InputNumber} from 'antd';
import 'antd/dist/antd.css';
import taskModelProcessor from './taskModelProcessor';
import managerProcessor from './taskManagerProcessor';
import EditTaskButtonViewer from './EditTaskButtonViewer';
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
class TaskModelViewer extends React.Component {
  // 初始化props
  constructor(props) {
    super(props);
    this.state = {
      disabled:false,
      initData : [],
      visible:false
    };
  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  // 新建
  openAddTaskModel = () => {
    this.props.form.setFieldsValue({
      taskName:'',
      taskType:'',
      second: 0,
      mini: 0,
      hour: 0,
      day: 1,
      month:1,
      week: '?',
    })
    this.setState({
      visible: true,
      initData : [
        {
          taskName:'',
          taskType:'',
          second: 0,
          mini: 0,
          hour: 0,
          day: 1,
          month:1,
          week: '?',
        }]
    })
  }

  // 删除任务
  deleteTask = () => {
    var record = this.props.record;
    var selectedRowKeys =this.props.selectedRowKeys;
    if (selectedRowKeys.length === 0) {
      openNotificationWithIcon('warning', '请选中一条数据删除！');
      return;
    }
    // 校验
    for (var i = 0; i < record.length; i++) {
      var isRun = record[i].isRun;
      if (isRun === "1") {
        openNotificationWithIcon('warning', '任务已启动,请停止后删除任务！');
        return;
      }
    }
    if(record.length>0){
      processor.deleteTask(record,data =>{
        openNotificationWithIcon('success', data.parameters.result);
        managerProssor.handleTableChange(null,this.props);
      })
    }
  }

  // 启用任务
  startTask = () => {
    var selectedRowKeys =this.props.selectedRowKeys;
    var record = this.props.record;
    if(selectedRowKeys.length===0){
      openNotificationWithIcon('warning', '请选中一条数据操作！');
      return;
    }
    for (var i = 0; i < record.length; i++) {
      var isRun  = record[i].isRun;
      if (isRun === "1") {
        openNotificationWithIcon('warning', '任务已启动,不能重复启动！');
        return;
      }
    }
    if(record.length>0){
      processor.startTask(record,data => {
        openNotificationWithIcon('success', data.parameters.result);
        managerProssor.handleTableChange(null,this.props);
      });
    }
  }

  // 停用任务
  stopTask = () => {
    var selectedRowKeys =this.props.selectedRowKeys;
    var record = this.props.record;
    if(selectedRowKeys.length===0){
      openNotificationWithIcon('warning', '请选中一条数据操作！');
      return;
    }
    for (var i = 0; i < record.length; i++) {
      var isRun  = record[i].isRun;
      if (isRun === "0") {
        openNotificationWithIcon('warning', '任务已停用,不能重复停用！');
        return;
      }
    }
    processor.stopTask(record,data =>{
      openNotificationWithIcon('success', '停用成功!');
      managerProssor.handleTableChange(null,this.props);
    });
  }

  // 手动执行一次
  manualRun = () => {
    var selectedRowKeys =this.props.selectedRowKeys;
    var record = this.props.record;
    if (selectedRowKeys.length !== 1) {
      openNotificationWithIcon('warning', '请选中一条任务执行！');
      return;
    }
    // 开启定时器
    if (!this.props.timeFlag){
      this.props.controlWebTimer(true);
    }
    // 立刻转动
    this.props.changeTaskStatuNow(record[0].taskId,true);
    // this.props.clearSelectedRows();
    processor.manualRun(record[0], data =>{
      managerProssor.handleTableChange(null,this.props);
      // 立刻停止
      this.props.changeTaskStatuNow(record[0].taskId,false);
      openNotificationWithIcon('success', data.parameters.result);
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

  // model确定新增
  saveModel = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if(!err){
        processor.addOrUpdateTask(null,fieldsValue,data =>{
          openNotificationWithIcon('success', data.parameters.result);
          managerProssor.handleTableChange(null,this.props);
          this.setState({visible:false});
        });
      }else {
        openNotificationWithIcon('warning', '请检查数据是否填写正确!');
      }
    });
  }

  onChange=(strValue,value)=>{
    if (value!==undefined){
      debugger
      switch (strValue){
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
        default:return '';
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
        children: [
          {
            title: '秒',
            dataIndex: 'second',
            key: 'second',
            render: (value, item) => (
              <InputNumber {...getFieldProps('second', {rules: [{
                required: true,
                validator(rule, values, callback){
                  if(values.length===0){
                    callback(`该项不可为空`);
                  }else if(/(^\s+)|(\s+$)/g.test(values)){
                    callback(`输入不合法`);
                  }else if(!/^[0-9]*$|[*]/.test(values)){
                    callback(`只能输入数字`);
                  }else {
                    callback();
                  }
                }
              }],initialValue: value})}
                         style={{width: 60}}  min={-1} max={59} step={1}
                         formatter={value => {if(value===-1){return '*'}else {return value}}}
                         // parser={value => value.replace('*', -1)}
                           onChange={(value)=>this.onChange('second',value)}/>
          )},
          {
          title: '分',
          dataIndex: 'mini',
          key: 'mini',
          className:'column-money',
          render: (value, item) => (
            <InputNumber {...getFieldProps('mini', { rules: [{
              required: true,
              validator(rule, values, callback){
                if(values.length===0){
                  callback(`该项不可为空`);
                }else if(/(^\s+)|(\s+$)/g.test(values)){
                  callback(`输入不合法`);
                }else if(!/^[0-9]*$|[*]/.test(values)){
                  callback(`只能输入数字`);
                }else {
                  callback();
                }
              }
            }], initialValue: value})}
                         style={{width: 60}}  min={-1} max={59} step={1}
                         formatter={value => {if(value===-1){return '*'}else {return value}}}
                         onChange={(value)=>this.onChange('mini',value)}/>
          )},
          {
          title: '时',
          dataIndex: 'hour',
          key: 'hour',
          className:'column-money',
          render: (value, item) => (
            <InputNumber {...getFieldProps('hour', {rules: [{
              required: true,
              validator(rule, values, callback){
                if(values.length===0){
                  callback(`该项不可为空`);
                }else if(/(^\s+)|(\s+$)/g.test(values)){
                  callback(`输入不合法`);
                }else if(!/^[0-9]*$|[*]/.test(values)){
                  callback(`只能输入数字`);
                }else {
                  callback();
                }
              }
            }],initialValue: value})}
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
            <InputNumber {...getFieldProps('day', {rules: [{
              required: true,
              validator(rule, values, callback){
                if(values.length===0){
                  callback(`该项不可为空`);
                }else if(/(^\s+)|(\s+$)/g.test(values)){
                  callback(`输入不合法`);
                }else if(!/^[0-9]*$|[*]|[?]/.test(values)){
                  callback(`只能输入数字`);
                }else {
                  callback();
                }
              }
            }],initialValue: value})}
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
            <InputNumber {...getFieldProps(`month`, {rules: [{
              required: true,
              validator(rule, values, callback){
                if(values.length===0){
                  callback(`该项不可为空`);
                }else if(/(^\s+)|(\s+$)/g.test(values)){
                  callback(`输入不合法`);
                }else if(!/^[0-9]*$|[*]/.test(values)){
                  callback(`只能输入数字`);
                }else {
                  callback();
                }
              }
            }],initialValue: value})}
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
            <InputNumber {...getFieldProps(`week`, {rules: [{
              required: true,
              validator(rule, values, callback){
                if(values.length===0){
                  callback(`该项不可为空`);
                }else if(/(^\s+)|(\s+$)/g.test(values)){
                  callback(`输入不合法`);
                }else if(!/^[0-9]*$|[*]|[?]/.test(values)){
                  callback(`只能输入数字`);
                }else {
                  callback();
                }
              }
            }],initialValue: value})}
                         style={{width: 60}}  min={0} max={7} step={1}
                         formatter={value => {if(value===0){return '*'}else if(value===-1){return '?'} else {return value}}}
                         onChange={(value)=>this.onChange('week',value)}/>
          )
        }
        ]
      }]
    return (
      <div>
        <div>
          <div style={{float:'right'}}>
            <Button type="primary" onClick={() => this.openAddTaskModel()}>新建</Button>&nbsp;
            <Popconfirm title="确定删除当前任务执?" onConfirm={() => this.deleteTask()}>
              <Button type="primary">删除</Button>
            </Popconfirm>&nbsp;
            <EditTaskButtonViewer dispatch={this.props.dispatch} dictType={this.props.dictType} record={this.props.record} selectedRowKeys={this.props.selectedRowKeys}/>
            <Popconfirm title="启用" onConfirm={() => this.startTask()}>
              <Button type="primary">启用</Button>
            </Popconfirm>&nbsp;
            <Popconfirm title="确定停用当前任务?" onConfirm={() => this.stopTask()}>
              <Button type="primary">停用</Button>
            </Popconfirm>&nbsp;
            <Popconfirm title="此任务会立即执行一次" onConfirm={() => this.manualRun()}>
              <Button type="primary">手动执行</Button>
            </Popconfirm>&nbsp;
          </div>
        </div>
        <Modal
          maskClosable={false}
          title="任务信息"
          width={900}
          visible={this.state.visible}
          onOk={this.saveModel}
          onCancel={this.handleCancel}
          okText="保存"
        >
          <Form layout="inline">
            <Table bordered dataSource={this.state.initData} columns={columns} pagination={false}/>
          </Form>
        </Modal>
      </div>
    );
  }
}

const taskMainViewer = Form.create()(TaskModelViewer);
export default taskMainViewer
