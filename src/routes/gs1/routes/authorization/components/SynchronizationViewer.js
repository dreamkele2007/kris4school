/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import {Form, Button, Modal,Input,Radio,notification} from 'antd';
import 'antd/dist/antd.css';
import JurisdictionProcessor from './SynchronizationProcessor';
const pagination = [];
const data = [];
const FormItem = Form.Item;
const Search = Input.Search;
const processor = new JurisdictionProcessor();
const RadioGroup = Radio.Group;
const openNotificationWithIcon = (type, msg) => {
  notification[type]({
    message: '通知消息',
    description: msg,
    placement: 'bottomRight'
  });
};

class SynchronizationViewer extends React.Component {

  state = {
    formCriteria:this.props.formCriteria,
    data,
    pagination,
    visible: false,
    value:1,
    disabled:true,
    disabledR:true
  };
  onRowClick = () => {
    this.setState({
      disabled: true,
    });
    // this.state.disabled=true;
    if(this.props.selectedRowKeysJur.length==1){
    this.setState({
      visible: true,
    });
    var data=this.props.selectedRows[0];
      if(data.isStop=="启用"){
        data.isStop=1;
      }else{
        data.isStop=2;
      }
      if(data.isPrivate==null || data.isPrivate==""){
        data.isPrivate="1";
      }
      if(data.isPrivate===1){
        this.setState({disabledR: false});
        // this.state.disabledR=false;
      }else{
        this.setState({disabledR: true});
        // this.state.disabledR=true;
      }
      this.props.form.setFieldsValue(data);
    }else{
      openNotificationWithIcon('warning','请选择一条数据');
    }
  };
  //判断输入的是否全是空格
  isNull=( str )=>{
    if ( str == "" ) return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
  }
  hideModal = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if(!err){
        if(this.isNull(fieldsValue.hospitalName)||this.isNull(fieldsValue.hospitalLevel)||this.isNull(fieldsValue.hospitalAttr)||
          this.isNull(fieldsValue.contacts)||this.isNull(fieldsValue.city)||this.isNull(fieldsValue.zipcode)||
          this.isNull(fieldsValue.url)||this.isNull(fieldsValue.isPrivate)||this.isNull(fieldsValue.address)
         ){
          openNotificationWithIcon('warning', '所填信息不合法，请重新检查！');
          return;
        }else {
          if(fieldsValue.domainId!=null && fieldsValue.domainId!=""){
            processor.updataDomain({total: 0, pageSize:10, current: 0, defaultCurrent: 0},fieldsValue, this.props,data=>{
              processor.likeQueryDomain({total: 0, pageSize:10, current: 0, defaultCurrent: 0}, '', this.props);
              openNotificationWithIcon('success', '修改成功!');
            });

          }else{
            processor.addDomain({total: 0, pageSize:10, current: 0, defaultCurrent: 0},fieldsValue, this.props,data=>{
              processor.likeQueryDomain({total: 0, pageSize:10, current: 0, defaultCurrent: 0}, '', this.props);
              openNotificationWithIcon('success', '添加成功!');
            });

          }
          this.setState({
            visible: false
          });
        }
      }
    });
  };
  handleCancel = () => {
    this.setState({visible: false});
  };
  showGs1Api = (value) => {
    processor.likeQueryDomain({total: 0, pageSize:10, current: 0, defaultCurrent: 0}, value, this.props);
  };
  componentWillMount(){
    processor.likeQueryDomain({total: 0, pageSize:10, current: 0, defaultCurrent: 0}, '', this.props);
  }
  sync=()=>{
    processor.sync(this.props,data=>{
      processor.likeQueryDomain({total: 0, pageSize:10, current: 0, defaultCurrent: 0}, '', this.props);
      openNotificationWithIcon('success','操作成功');
    });

  };
  addDomain=()=>{
    this.setState({ disabled: true,});
  // this.state.disabled=false;
    this.props.form.setFieldsValue({
      isPrivate:"0",
      hospitalName:'',
      hospitalLevel:'',
      address:'',
      hospitalAttr:'',
      city:'',
      zipcode:'',
      phone:'',
      contacts:'',
      url:'',
    });
      this.setState({
        visible: true,
        disabledR:true
      });
  };
  radioChange=(value)=>{
    if(value.target.value==='1'){
      this.setState({disabledR: false});
      // this.state.disabledR=false;
    }else{
      this.setState({disabledR: true});
      // this.state.disabledR=true;
    }
    };
  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
        labelCol:{span: '70px'},
      wrapperCol:{span: '300px'},
    };
    return (
      <div>
        <div style={{float:'left'}}>
             <Search
               placeholder="请输入医院名称"
               style={{ width: 160 }}
               onSearch={this.showGs1Api}
               maxLength="20"
             />
        </div>
        <div  style={{float:'right'}}>
          <Button type="primary" onClick={this.addDomain}>添加</Button>&nbsp;
        <Button type="primary" onClick={this.sync}>同步</Button>&nbsp;
        <Button type="primary" onClick={this.onRowClick} disabled={this.props.data.length==0?true:false}>修改</Button>&nbsp;
        <Modal
          title="租户信息"
          maskClosable={false}
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.handleCancel}
          okText="保存"
          width={550}
        >
         <Form layout="inline"   className="ant-advanced-search-form" >
               <FormItem  {...formItemLayout} label="医院名称">
                  {getFieldDecorator('hospitalName',{
                    rules: [ {
                      required: true,
                      validator(rule, values, callback){
                        if(values.length===0){
                          callback(`该项不可为空`);
                        }else if(/(^\s+)|(\s+$)/g.test(values)){
                          callback(`输入不合法`);
                        }else if(values.length > 20 ){
                          callback(`医院名称超过20个字符`);
                        }else{
                          callback();
                        }
                      }
                    }]
                  }   )(
                    <Input  maxLength="20" />
                    // disabled={this.state.disabled}
                  )}
                </FormItem>
                <FormItem   {...formItemLayout} label="医院级别">
                    {getFieldDecorator('hospitalLevel',{
                      rules: [ {
                        required: true,
                        validator(rule, values, callback){
                          if(values.length===0){
                            callback(`该项不可为空`);
                          }else if(/(^\s+)|(\s+$)/g.test(values)){
                            callback(`输入不合法`);
                          }else if(values.length > 4 ){
                            callback(`医院级别超过4个字符`);
                          }else{
                            callback();
                          }
                        }
                      }]
                    }  )(
                      <Input />
                    )}
               </FormItem>
               <FormItem    {...formItemLayout} label="医院地址" >
                 {getFieldDecorator('address',{
                   rules: [ {
                     required: true,
                     validator(rule, values, callback){
                       if(values.length===0){
                         callback(`该项不可为空`);
                       }else if(/(^\s+)|(\s+$)/g.test(values)){
                         callback(`输入不合法`);
                       }else if(values.length > 20 ){
                         callback(`医院地址超过20个字符`);
                       }else{
                         callback();
                       }
                     }
                   }]
                 } )(
                   <Input   maxLength="20"/>
                 )}
               </FormItem>
                <FormItem  {...formItemLayout} label="医院属性">
                  {getFieldDecorator('hospitalAttr', {
                    rules: [ {
                      required: true,
                      validator(rule, values, callback){
                        if(values.length===0){
                          callback(`该项不可为空`);
                        }else if(values.length > 20 ){
                          callback(`医院属性超过20个字符`);
                        }else{
                          callback();
                        }
                      }
                    }]
                  } )(
                    <Input   maxLength="20"/>
                  )}
                </FormItem>
                 <FormItem  {...formItemLayout} label="所在城市" >
                   {getFieldDecorator('city', {
                     rules: [ {
                       required: true,
                       validator(rule, values, callback){
                         if(values.length===0){
                           callback(`该项不可为空`);
                         }else if(/(^\s+)|(\s+$)/g.test(values)){
                           callback(`输入不合法`);
                         }else if(values.length > 20 ){
                           callback(`所在城市超过20个字符`);
                         }else{
                           callback();
                         }
                       }
                     }]
                   } )(
                     <Input />
                   )}
                 </FormItem>
                 <FormItem    {...formItemLayout} label="城市邮编" >
                   {getFieldDecorator('zipcode',{
                     rules: [ {
                       required: true,
                       validator(rule, values, callback){
                         if(values.length===0) {
                           callback(`该项不可为空`);
                         }else if(!/[1-9]\d{5}(?!\d)/.test(values)){
                           callback(`邮编输入有误，请重填`);
                         }else{
                           callback();
                         }
                       }
                     }]
                   } )(
                     <Input  maxLength="20" />
                   )}
                 </FormItem>
                 <FormItem   {...formItemLayout} label="联系方式">
                   {getFieldDecorator('phone', {rules: [ {
                     required: true,
                    validator(rule, values, callback){
                     if(values.length===0) {
                       callback(`该项不可为空`);
                     }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(values))){
                       callback(`联系方式输入有误，请重填`);
                     }else{
                       callback();
                     }
                   }}]
                   } )(
                     <Input  maxLength="20" />
                   )}
                 </FormItem>
                <FormItem   {...formItemLayout} label="联      系     人" >
                  {getFieldDecorator('contacts', {
                    rules: [ {
                      required: true,
                      validator(rule, values, callback){
                        if(values.length===0){
                          callback(`该项不可为空`);
                        }else if(/(^\s+)|(\s+$)/g.test(values)){
                          callback(`输入不合法`);
                        }else if(values.length > 4 ){
                          callback(`联系人超过4个字符`);
                        }else{
                          callback();
                        }
                      }
                    }]
                  } )(
                    <Input  maxLength="20" />
                  )}
                </FormItem>
               <FormItem    {...formItemLayout} label="公有私有">
                 {getFieldDecorator('isPrivate', {rules: [ {required: true, message: '该项不可为空',}]
                 } )(
                   <RadioGroup  onChange={(value)=>{this.radioChange(value)}}>
                     <Radio value={"0"}>公有</Radio>
                     <Radio value={"1"}>私有</Radio>
                   </RadioGroup>
                 )}
               </FormItem>
              {this.state.disabledR===false?<FormItem    {...formItemLayout} label="url">
                {getFieldDecorator('url' ,{
                  rules:[{
                    required: true,
                    validator(rule, values, callback){
                      if(values.length===0){
                        callback(`该项不可为空`)
                      }else if(!/^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(values)){
                        callback(`网址输入有误，请重填`);
                      }else{
                        callback()
                      }
                    }
                  }]
                })(
                  <Input style={{width:'420px'}} disabled={this.state.disabledR}  maxLength="200" />
                )}
              </FormItem>:''}
               <FormItem {...formItemLayout}>
                 {getFieldDecorator('domainId',)(
                   <Input type='hidden' />
                 )}
               </FormItem >
            </Form>
          </Modal>
        </div>
    </div>
    );
  }
}
const synchronizationViewer = Form.create()(SynchronizationViewer);
export default synchronizationViewer;
