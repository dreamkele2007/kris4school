/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import {Form,Table,Button,Modal,Input,Popconfirm,Select,notification, InputNumber,} from 'antd';
import 'antd/dist/antd.css';
import documentDistributeProcessor from './documentDistributeManagerProcessor';
import documentDistributeModelProcessor from './documentDistributeModelProcessor';
const Option = Select.Option;
// 表单项
const managerProssor = new documentDistributeProcessor();
const processor = new documentDistributeModelProcessor();
const openNotificationWithIcon = (type, msg) => {
  notification[type]({
    message: '通知消息',
    description: msg,
    placement: 'bottomRight'
  });
};

class DocumentDistributeModelViewer extends React.Component {
  constructor(props) {
    super(props);
    // 声明state
    this.state = {
      disabled:false,
      initData : []
    };
  }

  // model确定
  saveModel = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if(!err){
        processor.addOrUpdateTask(this.props.record[0],fieldsValue,data =>{
          if (data.header.code == 1) {
            openNotificationWithIcon('success', data.parameters.result);
            managerProssor.handleTableChange(null,this.props);
          } else {
            openNotificationWithIcon('error', '修改失败!');
          }
          this.setState({visible:false});
        });
      }
    });
  }
  // model取消
  handleCancel = () => {
    this.setState({
      disabled: true,
      visible: false
    });
  }
  // 修改任务
  updateTask = () => {
    var selectedRowKeys =this.props.selectedRowKeys;
    // 校验
    if (selectedRowKeys.length != 1) {
      openNotificationWithIcon('warning', '请选中一条数据进行修改！');
      return;
    }
    // if(selectedRowData[0].isRun=='1'){
    //     openNotificationWithIcon('warning', '请先停止任务再修改！');
    //     return;
    // }
    // 填充form数据
    var record = this.props.record;
    var arr = record[0].crontab.split(' ');
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
    // 显示model
    this.setState({
      visible: true
    });
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
      if (isRun == "1") {
        openNotificationWithIcon('warning', '任务已启动,不能重复启动！');
        return;
      }
    }
    if(record.length>0){
      processor.startTask(record,data => {
        if (data.header.code == 1) {
          openNotificationWithIcon('success', data.parameters.result);
          managerProssor.handleTableChange(null,this.props);
        } else {
          openNotificationWithIcon('error', '启动失败!');
        }
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
      if (isRun == "0") {
        openNotificationWithIcon('warning', '任务已停用,不能重复停用！');
        return;
      }
    }
    processor.stopTask(record,data =>{
      if (data.header.code == 1) {
        openNotificationWithIcon('success', data.parameters.result);
        managerProssor.handleTableChange(null,this.props);
      } else {
        openNotificationWithIcon('error', '停用失败!');
      }
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
      if (data.header.code == 1) {
        managerProssor.handleTableChange(null,this.props);
        // 立刻停止
        this.props.changeTaskStatuNow(record[0].taskId,false);
        // openNotificationWithIcon('success', data.parameters.result);
      } else {
        openNotificationWithIcon('error', '执行失败!');
      }
    });
  }

  onChange=(strValue,value)=>{
    if (value!=undefined){
      switch (strValue)
      {
        case 'second':
          if(value==-1){
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
          if(value==-1){
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
          if(value==-1){
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
          if (value==0){
            this.props.form.setFieldsValue({
              day:'*'
            })
          }else if (value==-1){
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
          if(value==0){
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
          if (value==0){
            this.props.form.setFieldsValue({
              week:'*'
            })
          }else if (value==-1){
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
      }
    }
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
                  style={{width: 120}} disabled={true}>
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
                         formatter={value => {if(value==-1){return '*'}else {return value}}}
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
                         formatter={value => {if(value==-1){return '*'}else {return value}}}
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
                         formatter={value => {if(value==-1){return '*'}else {return value}}}
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
                         formatter={value => {if(value==0){return '*'}else if(value==-1){return '?'} else {return value}}}
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
                         formatter={value => {if(value==0){return '*'}else {return value}}}
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
                         formatter={value => {if(value==0){return '*'}else if(value==-1){return '?'} else {return value}}}
                         onChange={(value)=>this.onChange('week',value)}/>
          )
        }
        ]
      }]
    return (
      <div>
        <div>
          <div style={{float:'right'}}>
            <Button type="primary" onClick={() => this.updateTask()}>修改</Button>&nbsp;
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
        <div>
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
      </div>
    );
  }
}


const DocumentDistributeFormViewer = Form.create()(DocumentDistributeModelViewer);
export default DocumentDistributeFormViewer
