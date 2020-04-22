/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import {Button,Modal,Form,Input,notification,Radio} from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import ManualProcessor from './ManualProcessor';
const openNotificationWithIcon = (type, msg) => {
  notification[type]({
    message: '通知消息',
    description: msg,
    placement: 'bottomRight'
  });
};
const RadioGroup = Radio.Group
const FormItem = Form.Item;
const  processor=new ManualProcessor();
class ManualOneForm extends React.Component {
  state = {
    visible: false,
    record:this.props.record,
    modelData:this.props.modelData,
    domainValue:this.props.domainValue,
    formValue:this.props.selectedRowKeys,
    value:this.props.selectedRows,
    statu:this.props.dis,
  }
  //回显Form表单数据
  onRowClick=()=>{
    if(this.props.selectedRows[0]==null){
        openNotificationWithIcon('warning', '请重新选择数据进行修改!');
        return;
    }else{
      this.props.form.setFieldsValue(this.props.domainValue);
      this.setState({
        visible: true,
      })
    }
  };
  //关闭Model框
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  //判断输入的是否全是空格
  isNull=( str )=>{
    if ( str == "" ) return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
  }
  //点击保存，进行修改数据
  handleOk = (e) => {
    var domainDataId= this.props.domainValue.domainDataId;
   var submitId= this.props.submitId
   var name= this.props.name
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if(!err){
          if(this.isNull(values.manufacturingPlantName)||this.isNull(values.manufacturingPlantAddress)||
            this.isNull(values.productName)||this.isNull(values.spec)||this.isNull(values.gs1Gtin)||
            this.isNull(values.productDescription)||this.isNull(values.gpcCatagoryCode)||
            this.isNull(values.brandName)||this.isNull(values.imageLink)){
            openNotificationWithIcon('warning', '所填信息不合法，请重新检查!');
            return;
          }else if(values.imageLink==null){
            openNotificationWithIcon('warning', '请选择图像!');
            return;
          }else{
            var strA='none';
            var staB=this.props.dis;
            var arr=this.props.selectedRowKeys;
            var val=this.props.selectedRows;
            val.splice(0, 1);
            arr.splice(0,arr.length);
            staB=strA;
            processor.updateDataOne(null,this.props,domainDataId,submitId,values,name,this)
            openNotificationWithIcon('success', '修改成功!');
            this.setState({
              visible: false,
              domainValue:values,
              formValue:arr,
              value:val,
              statu:staB,
            })
          }
        }
      });
  }
  //复制
  copyAll=(type)=>{
   const record=this.props.record;
   if(type=='all'){
     this.props.form.setFieldsValue({
       manufacturingPlantAddress : record.manufacturingPlantAddress,
       manufacturingPlantName : record.manufacturingPlantName,
       productDescription : record.productDescription,
       productdataStatus : record.productdataStatus,
       gpcCatagoryCode : record.gpcCatagoryCode,
       productName : record.productName,
       imageLink : record.imageLink,
       brandName : record.brandName,
       gs1Gtin : record.gtin,
       spec : record.spec,
     });
   }else if(type=='productdataStatus'){
     this.props.form.setFieldsValue({
       productdataStatus : record.productdataStatus
     });
   }else if(type=='productDescription'){
     this.props.form.setFieldsValue({
       productDescription : record.productDescription
     });
   }else if(type=='imageLink'){
     this.props.form.setFieldsValue({
       imageLink : record.imageLink
     });
   }else if(type=='brandName'){
     this.props.form.setFieldsValue({
       brandName : record.brandName
     });
   }else if(type=='gpcCatagoryCode'){
     this.props.form.setFieldsValue({
       gpcCatagoryCode : record.gpcCatagoryCode
     });
   }else if(type=='manufacturingPlantName'){
     this.props.form.setFieldsValue({
       manufacturingPlantName : record.manufacturingPlantName
     });
   }else if(type=='manufacturingPlantAddress'){
     this.props.form.setFieldsValue({
       manufacturingPlantAddress : record.manufacturingPlantAddress
     });
   }else if(type=='productName'){
     this.props.form.setFieldsValue({
       productName : record.productName
     });
   }else if(type=='spec'){
     this.props.form.setFieldsValue({
       spec : record.spec
     });
   }else{
     this.props.form.setFieldsValue({
       gs1Gtin : record.gtin
     });
   }
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <span>
         <Button onClick={this.onRowClick}>修改</Button>
            <Modal
            title="修改数据"
            visible={this.state.visible}
            maskClosable={false}
            style={{ marginLeft: 350,marginTop: -80}}
            onOk={this.handleOk}
            onCancel={this.hideModal}
            width={800}
            footer={[
              <Button key="back" size="large" onClick={this.hideModal}>关闭</Button>,
              <Button key="submit" type="primary" size="large"  onClick={this.handleOk}>保存</Button>,
            ]}
            >
              <Form layout="inline">
                <table>
                   <tr>
                    <td></td>
                    <td style={{width:200,textAlign:'center'}}>用 户 上 传</td>
                    <td style={{width:200,textAlign:'center'}}>标 准 数 据</td>
                    &nbsp;&nbsp;&nbsp;
                    <td style={{width:151,textAlign:'center'}}>
                      <Button size="small" type="primary" onClick={()=>{this.copyAll('all')}}>全部复制</Button>
                    </td>
                   </tr>
                   <tr>
                    <td style={{width:200,textAlign:'center'}}>厂商</td>
                    <td style={{width:151,textAlign:'center'}}>
                      <FormItem>
                        {getFieldDecorator('manufacturingPlantName',{
                          rules: [{required: true, message: '请输入供应商!'}],
                        })(
                          <Input style={{width:151}} />
                        )}
                      </FormItem>
                    </td>
                    <td style={{width:151,textAlign:'center'}}>{this.props.record.manufacturingPlantName}</td>
                    &nbsp;&nbsp;&nbsp;
                    <td style={{width:151,textAlign:'center'}}>
                      <Button size="small" type="primary" onClick={()=>{this.copyAll('manufacturingPlantName')}}>复制</Button>
                    </td>
                   </tr>
                   <tr>
                    <td style={{width:151,textAlign:'center'}}>产品品牌</td>
                    <td style={{width:151,textAlign:'center'}}>
                      <FormItem>
                        {getFieldDecorator('brandName',{
                          rules: [{required: true, message: '请输入产品品牌!'}],
                        })(
                          <Input style={{width:151}} />
                        )}
                      </FormItem>
                    </td>
                    <td style={{width:151,textAlign:'center'}}>{this.props.record.brandName}</td>
                     &nbsp;&nbsp;&nbsp;
                     <td style={{width:151,textAlign:'center'}}>
                      <Button size="small" type="primary" onClick={()=>{this.copyAll('brandName')}}>复制</Button>
                    </td>
                   </tr>
                   <tr>
                    <td style={{width:151,textAlign:'center'}}>企业地址</td>
                     <td style={{width:151,textAlign:'center'}}>
                       <FormItem>
                          {getFieldDecorator('manufacturingPlantAddress',{
                            rules: [{required: true, message: '请输企业地址!'}],
                          })(
                            <Input style={{width:151}} />
                          )}
                        </FormItem>
                     </td>
                    <td style={{width:151,textAlign:'center'}}>{this.props.record.manufacturingPlantAddress}</td>
                     &nbsp;&nbsp;&nbsp;
                     <td style={{width:151,textAlign:'center'}}>
                      <Button size="small" type="primary" onClick={()=>{this.copyAll('manufacturingPlantAddress')}}>复制</Button>
                    </td>
                   </tr>
                   <tr>
                    <td style={{width:151,textAlign:'center'}}>产品名称</td>
                     <td style={{width:151,textAlign:'center'}}>
                       <FormItem>
                          {getFieldDecorator('productName',{
                            rules: [{required: true, message: '请输入产品名称!'}],
                          })(
                            <Input style={{width:151}} />
                          )}
                        </FormItem>
                     </td>
                    <td style={{width:151,textAlign:'center'}}>{this.props.record.productName}</td>
                     &nbsp;&nbsp;&nbsp;
                     <td style={{width:151,textAlign:'center'}}>
                      <Button size="small" type="primary" onClick={()=>{this.copyAll('productName')}}>复制</Button>
                    </td>
                   </tr>
                   <tr>
                    <td style={{width:151,textAlign:'center'}}>产品说明</td>
                     <td style={{width:151,textAlign:'center'}}>
                       <FormItem>
                          {getFieldDecorator('productDescription',{
                            rules: [{required: true, message: '请输入产品说明!'}],
                          })(
                            <Input style={{width:151}} />
                          )}
                        </FormItem>
                     </td>
                    <td style={{width:151,textAlign:'center'}}>{this.props.record.productDescription}</td>
                    &nbsp;&nbsp;&nbsp;
                    <td style={{width:151,textAlign:'center'}}>
                      <Button size="small" type="primary" onClick={()=>{this.copyAll('productDescription')}}>复制</Button>
                    </td>
                   </tr>
                   <tr>
                    <td style={{width:151,textAlign:'center'}}>产品规格</td>
                     <td style={{width:151,textAlign:'center'}}>
                       <FormItem>
                          {getFieldDecorator('spec',{
                            rules: [{required: true, message: '请输入产品规格!'}],
                          })(
                            <Input style={{width:151}} />
                          )}
                        </FormItem>
                     </td>
                     <td style={{width:151,textAlign:'center'}}>{this.props.record.spec}</td>
                     &nbsp;&nbsp;&nbsp;
                     <td style={{width:151,textAlign:'center'}}>
                      <Button size="small" type="primary" onClick={()=>{this.copyAll('spec')}}>复制</Button>
                    </td>
                   </tr>
                   <tr>
                    <td style={{width:151,textAlign:'center'}}>GPC分类码</td>
                     <td style={{width:151,textAlign:'center'}}>
                       <FormItem>
                          {getFieldDecorator('gpcCatagoryCode',{
                            rules: [{required: true, message: '请输入GPC分类码!'}],
                          })(
                            <Input style={{width:151}} />
                          )}
                        </FormItem>
                     </td>
                     <td style={{width:151,textAlign:'center'}}>{this.props.record.gpcCatagoryCode}</td>
                     &nbsp;&nbsp;&nbsp;
                     <td style={{width:151,textAlign:'center'}}>
                      <Button size="small" type="primary" onClick={()=>{this.copyAll('gpcCatagoryCode')}}>复制</Button>
                    </td>
                   </tr>
                   <tr>
                    <td style={{width:151,textAlign:'center'}}>GTIN码</td>
                     <td style={{width:151,textAlign:'center'}}>
                      <FormItem>
                        {getFieldDecorator('gs1Gtin',{
                          rules: [{required: true, message: '请输入GTIN码!'}],
                        })(
                          <Input style={{width:151}} />
                          )}
                        </FormItem>
                    </td>
                    <td style={{width:151,textAlign:'center'}}>{this.props.record.gtin}</td>
                      &nbsp;&nbsp;&nbsp;
                     <td style={{width:151,textAlign:'center'}}>
                      <Button size="small"  type="primary"  onClick={()=>{this.copyAll('gs1Gtin')}}>复制</Button>
                    </td>
                   </tr>
                   <tr >
                    <td style={{width:151,textAlign:'center'}}>产品图像</td>
                     <td style={{width:151,textAlign:'center'}}>
                       <FormItem>
                          {getFieldDecorator('imageLink',{
                          })(
                            <span>
                             {this.props.form.getFieldValue('imageLink')==null? null:<img width={150} height={150} src={this.props.form.getFieldValue('imageLink')}/>}
                            </span>
                          )}
                        </FormItem>
                     </td>
                     <td style={{width:151,textAlign:'center'}}><img width={150} height={150} src={this.props.record.imageLink}/></td>
                     &nbsp;&nbsp;&nbsp;
                     <td style={{width:151,textAlign:'center'}}>
                      <Button size="small" type="primary" onClick={()=>{this.copyAll('imageLink')}}>复制图像</Button>
                    </td>
                   </tr>
               </table>
             </Form>
            </Modal>
      </span>
    );
  }
}
ManualOneForm =Form.create()(ManualOneForm);
export default ManualOneForm;
