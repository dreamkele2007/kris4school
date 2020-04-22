/**
 * Created by admin on 2017/8/30.
 */
import React from 'react';
import {Input,Modal, Button, Form,Popconfirm,notification} from 'antd';
import AddMenuModelProcessor from './AddMenuModelProcessor';
import ProductForm from './ProductFormProcessor';

const processprForm = new ProductForm();
const processor =new AddMenuModelProcessor();
const FormItem = Form.Item;
const openNotificationWithIcon = (type, msg) => {
  notification[type]({
    message: '通知消息',
    description: msg,
    placement: 'bottomRight'
  });
};
class AddMenuModelViewer extends React.Component {
  state={
    visible:false,
    selectedRowKeys:this.props.selectedRowKeys,
    name:'',
  }
  //判断输入的是否全是空格
  isNull=( str )=>{
    if ( str === "" ) return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
  }
  //修改回显
  updataMenu = ()=> {
    if(this.props.selectedRowKeys.length===1){
      this.setState({
        visible:true,
        selectedRowKeys:this.props.selectedRowKeys,
        name:'update',
      });
      var value=this.props.selectedRows[0];
      this.props.form.setFieldsValue(value);
    }else{
      openNotificationWithIcon('warning','请选中一条数据');
    }
  };
  //添加厂商
  addMenu=()=> {
    this.setState({
      visible: true,
      name:'add',
    });
    this.props.form.setFieldsValue({
      gs1ManuId:null,
      gln:null,
      manuCode:null,
      gs1ManuName:null
    });
  };
  //关闭Model
  cancelForm=()=>{
    this.setState({
      visible:false
    });
  };
  //保存
  saveForm=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if(!err){
        if(this.isNull(fieldsValue.gln)||this.isNull(fieldsValue.manuCode)||this.isNull(fieldsValue.gs1ManuName)){
          openNotificationWithIcon('warning', '所填信息不合法，请重新检查！');
          return;
        }else {
          if(fieldsValue.gs1ManuId==null){
            processor.addGs1MenuDict({total:0,pageSize:10,current:1,defaultCurrent:1},fieldsValue,this.props,data => {
              processprForm.likeQueryProduct({total:0,pageSize:10,current:1,defaultCurrent:1},'',this.props);
            });
            openNotificationWithIcon('success', '添加成功!');
          }else{
            processor.updateGs1MenuDict({total:0,pageSize:10,current:1,defaultCurrent:1},fieldsValue, this.props,data => {
              processprForm.likeQueryProduct({total:0,pageSize:10,current:1,defaultCurrent:1},'',this.props);
            });
            openNotificationWithIcon('success', '修改成功!');
          }
          this.setState({
            visible:false
          });
        }
      }
    });
    const arr = this.props.selectedRowKeys;
    arr.splice(0,arr.length)
    this.setState({
      selectedRowKeys:arr
    });
  };
  //删除
  dalete=()=>{
    if(this.props.selectedRows.length>0){
      var value=[];
      for(var i=0;i<this.props.selectedRows.length;i++) {
        value.push(this.props.selectedRows[i])
      }
      processor.deleteGs1MenuDist({total:0,pageSize:10,current:1,defaultCurrent:1},value,this.props,data => {
        processprForm.likeQueryProduct({total:0,pageSize:10,current:1,defaultCurrent:1},'',this.props);})
      const arr = this.props.selectedRowKeys;
      arr.splice(0,arr.length)
      this.setState({
        selectedRowKeys:arr
      });
      openNotificationWithIcon('success', '删除成功!');
    }else{
      openNotificationWithIcon('warning', '至少选择一条进行删除！');
    }
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 10},
      wrapperCol:{span: 10 },
    };
    return (
      <div  style={{display:'inline-block'}}>
        <div>
          <Button type="primary" onClick={()=>{this.addMenu()}} >添加</Button>&nbsp;
          <Button type="primary" onClick={()=>{this.updataMenu()}}>修改</Button>&nbsp;
          <Popconfirm title="确定删除选中数据吗?" onConfirm={() => this.dalete()}>
            <Button type="primary" >删除</Button>&nbsp;
          </Popconfirm>
        </div>
        <Modal
          title={this.state.name==='add'?`添加厂商`:`修改厂商`}
          visible={this.state.visible}
          onOk={this.saveForm}
          maskClosable={false}
          onCancel={this.cancelForm}
          width={500}
          okText="保存"
        >
          <Form>
            <FormItem  {...formItemLayout} label={`gln`} >
              {getFieldDecorator(`gln`,{
                rules: [{
                  required: true,
                  message: '请输入gln!'
                },{
                  validator(rule, values, callback){
                    if(values==null){
                      callback();
                    }else if(values.length > 4 ){
                      callback(`gln超过4个字符`);
                    }else{
                      callback();
                    }
                  }
                }],
              })(
                <Input  />
              )}
            </FormItem>
            <FormItem  {...formItemLayout}  label={`厂商编码`} >
              {getFieldDecorator(`manuCode`,{
                rules: [{
                  required: true,
                  message: '请输入厂商编码!'
                },{
                  validator(rule, values, callback){
                    if(values==null){
                      callback();
                    }else if(values.length > 10 ){
                      callback(`厂商编码超过10个字符`);
                    }else{
                      callback();
                    }
                  }
                }],
              })(
                <Input  />
              )}
            </FormItem>
            <FormItem  {...formItemLayout}  label={`厂商名称`} >
              {getFieldDecorator(`gs1ManuName`,{
                rules: [{
                  required: true,
                  message: '请输入厂商名称!'
                },{
                  validator(rule, values, callback){
                    if(values==null){
                      callback();
                    }else if(values.length > 15 ){
                      callback(`厂商名称超过15个字符`);
                    }else{
                      callback();
                    }
                  }
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem  {...formItemLayout}  >
              {getFieldDecorator(`gs1ManuId`)(
                <Input type='hidden'  />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
AddMenuModelViewer =Form.create()(AddMenuModelViewer);
export default AddMenuModelViewer;
