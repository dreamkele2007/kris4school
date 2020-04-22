/**
 * Created by admin on 2017/8/14.
 */
import React from 'react';
import {Input,Modal, Button, Form,notification} from 'antd';
import RegisterDomainFormProcessor from './RegisterDomainFormProcessor'
import 'antd/dist/antd.css';
const FormItem = Form.Item;
const processor =new  RegisterDomainFormProcessor();
const Search = Input.Search;
const openNotificationWithIcon = (type, msg) => {
  notification[type]({
    message: '通知消息',
    description: msg,
    placement: 'bottomRight'
  });
};
class RegisterDomainFormViewer extends React.Component {
  state={
    visible:false
  }
  componentWillMount(){
    processor.queryHospital({total:0,pageSize:10,current:1,defaultCurrent:1},null,this.props);
  }
  componentWillReceiveProps(newProps) {

  };
  deleteManuDomain=()=>{
    if(this.props.selectedRowKeys.length>0){
      processor.deleteHospital(this.props.selectedRows,this.props)
      this.setState({
        selectedRows:[]
      })
      openNotificationWithIcon('success','删除成功！');
    }else{
      openNotificationWithIcon('warning','请选中一条数据！');
    }
  };
  onRowClick=()=> {
    this.setState({
      visible: true
    })
    this.props.form.setFieldsValue({
      hospitalName:'',
      hospitalLevel:'',
      contacts:'',
      city:'',
      address:'',
      zipcode:'',
      phone:'',
      domainId:'',
    });
  };
  updateonRowClick=()=>{
    if(this.props.selectedRowKeys.length===1){
      this.setState({
        visible:true
      });
      var record=this.props.selectedRows[0];
      this.props.form.setFieldsValue({
        hospitalName:record.hospitalName,
        hospitalLevel:record.hospitalLevel,
        contacts:record.contacts,
        city:record.city,
        address:record.address,
        zipcode:record.zipcode,
        phone:record.phone,
        domainId:record.domainId,
      });
    }else{
      openNotificationWithIcon('warning','请选中一条数据');
    }
  };
  hideClose = () => {
    this.setState({
      visible: false,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if(fieldsValue.domainId==null){
        processor.addManuDomain(fieldsValue,this.props)
        openNotificationWithIcon('success','添加操作成功');
      }else{
        processor.updateManuDomain(fieldsValue,this.props)
        openNotificationWithIcon('success','修改操作成功');
      }
    });
    this.setState({visible: false});
  };
  showGs1Api = (value) => {
    processor.queryHospital({total: 0, pageSize:10, current: 0, defaultCurrent: 0},value, this.props);
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div  >
        <div style={{float:'left'}}>
          <Search
            placeholder="请输入医院名称"
            style={{width: 140}}
            onSearch={this.showGs1Api}
            maxLength="20"
          />
        </div>
        <div style={{float:'right'}}>
          <Button type="primary" onClick={()=>{this.onRowClick()}}>添加</Button>&nbsp;
          <Button type="primary" onClick={()=>{this.updateonRowClick()}}>修改</Button>&nbsp;
          <Button type="primary" onClick={()=>{this.deleteManuDomain()}}>删除</Button>&nbsp;
        </div>
        <Modal
          title="厂商信息"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.hideClose}
          okText="保存"
          footer={[
            <Button key="submit" type="primary" size="large" onClick={this.handleSubmit}>
              保存
            </Button>
          ]}
        >
          <Form  layout="inline"  className="ant-advanced-search-form">
              <FormItem>
                {getFieldDecorator('domainId',{}
                )(
                  <Input  type="hidden" style={{width: '122px'}} />
                )}
              </FormItem>
              <br/>
              <FormItem  label={`医院名称`}>
                {getFieldDecorator('hospitalName',{
                  rules: [{required: true, message: '请输入医院名称!'}],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem  label={`医院等级`}>
                {getFieldDecorator('hospitalLevel',{
                  rules: [{required: true, message: '请输入医院等级!'}],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem  label={`联系人`}>
                {getFieldDecorator('contacts',{
                  rules: [{required: true, message: '请输入联系人!'}],
                })(
                  <Input />
                )}
              </FormItem>
            <FormItem  label={`城市`}>
              {getFieldDecorator('city',{
                rules: [{required: true, message: '请输入城市!'}],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem  label={`地址`}>
              {getFieldDecorator('address',{
                rules: [{required: true, message: '请输入地址!'}],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem  label={`邮编`}>
              {getFieldDecorator('zipcode',{
                rules: [{required: true, message: '请输入邮编!'}],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem  label={`手机号`}>
              {getFieldDecorator('phone',{
                rules: [{required: true, message: '请输入手机号!'}],
              })(
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }

}

RegisterDomainFormViewer=Form.create()(RegisterDomainFormViewer);
export default RegisterDomainFormViewer;

