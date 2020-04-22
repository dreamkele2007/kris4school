/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Form,Select,Popconfirm,Modal,Input,notification,Button,Radio} from 'antd';
import 'antd/dist/antd.css';
import ManuDictFromProcessor from './CallbackUrlFromProcessor';

const FormItem = Form.Item;
const pagination=[];
const RadioGroup = Radio.Group;
const operatortDropDown = [];
const Option = Select.Option;
const  processor = new ManuDictFromProcessor();
const openNotificationWithIcon = (type, msg) => {
  notification[type]({
    message: '通知消息',
    description: msg,
    placement: 'bottomRight'
  });
};
class ProductFormViewer extends React.Component {

  state = {
    data:[],
    pagination,
    visible:false,
    operatortDropDown,
    value: 1,
    radio:[],
    domainId:'',
    selectedRowKeys:this.props.selectedRowKeys,
    selectedRows:this.props.selectedRows
  };
  onRowClick = ()=> {
    this.setState({
      visible:true,
      name:'add'
    });
     this.props.form.setFieldsValue({
       isStop:this.state.value,
       domainName:null,
       noticeUrl:null,
       note:null,
       id:null,
       domainId:null
    });
  };
  updata = ()=> {
    if(this.props.selectedRowKeys.length==1){
      this.setState({
        visible:true,
        selectedRowKeys:this.props.selectedRowKeys,
        name:'update'
      });
      var value=this.props.selectedRows[0];
      if(value.isStop=="启用"){
        value.isStop=1;
      }else{
        value.isStop=2;
      }
      this.props.form.setFieldsValue(value);
    }else{
      openNotificationWithIcon('error','请选中一条数据');
    }

  };
  componentWillMount(){
    processor.queryDomain(data => {
      //下面的就是请求来的数据
      var result = data.getSinglePrimary();
      this.setState({
        data:result
      })
    });
    processor.queryDomainManuDict({total:0,pageSize:10,current:1,defaultCurrent:1},null,this.props);

  }
  drawTaskTypes(){
    const children =[];
    for (let i = 0; i < this.state.data.length; i++) {
      var obj = this.state.data[i];
      children.push(<Option value={obj.domainId} key={obj.domainId}>{obj.domainName}</Option>);
    }
    return children;
  }
  cancelForm=()=>{
    this.setState({visible:false});
  };
  //判断输入的是否全是空格
  isNull=( str )=>{
    if ( str == "" ) return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
  }
  saveForm=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if(!err){
        if(this.isNull(fieldsValue.noticeUrl)||this.isNull(fieldsValue.note)){
          openNotificationWithIcon('warning', '所填信息不合法，请重新检查！');
          return;
        }else{
          if(fieldsValue.id==null){
            fieldsValue.domainId=this.state.domainId;
            processor.addManuDomain({total:0,pageSize:10,current:1,defaultCurrent:1},fieldsValue,this.props,data=>{
              processor.queryDomainManuDict({total:0,pageSize:10,current:1,defaultCurrent:1},null,this.props);
              openNotificationWithIcon('success', '添加成功!');
            })
          }else{
            if(this.state.domainId!=null && this.state.domainId!=''){
              fieldsValue.domainId=this.state.domainId;
            }
            processor.updataManuDomain({total:0,pageSize:10,current:1,defaultCurrent:1},fieldsValue, this.props,data=>{
              processor.queryDomainManuDict({total:0,pageSize:10,current:1,defaultCurrent:1},null,this.props);
              openNotificationWithIcon('success', '修改成功!');
            })
          }
          this.setState({
            visible:false
          });
        }
      }
    });
    console.log(this.state.selectedRowKeys);
    const arr = [];
    this.setState({
      selectedRowKeys:arr
    });

  };
  dalete=()=>{
    if(this.props.selectedRows.length==0){
      openNotificationWithIcon('warning','至少选中一条数据');
    }else{
      processor.deleteManuDomain({total:0,pageSize:10,current:1,defaultCurrent:1},this.props.selectedRows, this.props,data=>{
        processor.queryDomainManuDict({total:0,pageSize:10,current:1,defaultCurrent:1},null,this.props);
        openNotificationWithIcon('success', '删除成功!');
      });

    }
  };
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  handleChange=(value)=>{
    var props=this.props;
    processor.queryDomainManuDict({total:0,pageSize:10,current:1,defaultCurrent:1},value,props)
 }
  changeS=(value)=>{
    this.setState({
      domainId: value,
    });
  // this.state.domainId=value;
  }
render() {
  const { getFieldDecorator } = this.props.form;
  const formItemLayout = {
    labelCol: { span: 10},
    wrapperCol:{span: 10 },
  };
  let children=this.drawTaskTypes();
  return (
    <div style={{width:'100%',display:'inline-block'}}>
      <div style={{float:'left'}}>
        <Select
          showSearch
          style={{ width: 150 }}
          placeholder="请输入租户名称"
          optionFilterProp="children"
          onChange={this.handleChange}
          allowClear={true}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {children}
        </Select>
      </div>

      <div style={{float:'right'}} >
        <Button type="primary" onClick={()=>{this.onRowClick()}} >添加</Button>&nbsp;
        <Button type="primary" onClick={()=>{this.updata()}}>修改</Button>&nbsp;
        <Popconfirm title="确定删除选中数据吗？" onConfirm={() => this.dalete()}>
          <Button type="primary">删除</Button>&nbsp;
        </Popconfirm>
      </div>
      <Modal
        title={this.state.name=='add'?`添加租户访问地址`:`修改租户访问地址`}
        visible={this.state.visible}
        maskClosable={false}
        onOk={this.saveForm}
        okText="保存"
        onCancel={this.cancelForm}
        width={400}
      >
        <Form
          className="ant-advanced-search-form"
        >
          <FormItem  {...formItemLayout}  label={`租户`}>
            {getFieldDecorator(`domainId`,{
              rules: [ {
                required: true, message: '该项不可为空',
              }]
            } )(
              <Select onChange={(value)=>{this.changeS(value)}}>
                {children}
              </Select>
            )}
          </FormItem>
          <FormItem  {...formItemLayout}  label={`访问地址`}>
            {getFieldDecorator(`noticeUrl`,{
              rules: [ {
                required: true,
                validator(rule, values, callback){
                  if(values==null) {
                    callback("访问地址不能为空");
                  }else if(!/^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(values)){
                    callback(`访问地址输入有误，请重填`);
                  }else{
                    callback()
                  }
                }
              }]
            })(
              <Input  />
            )}
          </FormItem>
          <FormItem  {...formItemLayout}  label={`状态`}>
            {getFieldDecorator(`isStop`,{
              rules: [ {
                required: true, message: '该项不可为空',
              }]
            })(
              <RadioGroup onChange={this.onChange}  value={1}>
                <Radio value={1}>启用</Radio>
                <Radio value={2}>停用</Radio>

              </RadioGroup>
            )}
          </FormItem><FormItem  {...formItemLayout}  label={`备注`}>
          {getFieldDecorator(`note`)(
            <Input   />
          )}
        </FormItem>
          <FormItem  {...formItemLayout}  >
            {getFieldDecorator(`id`)(
              <Input type='hidden'  />
            )}
          </FormItem>
          <FormItem  {...formItemLayout}  >
            {getFieldDecorator(`token`)(
              <Input type='hidden'  />
            )}
          </FormItem>
        </Form>
      </Modal>
    </div>
);
}
}
const  productFormViewer=Form.create()(ProductFormViewer);
export default productFormViewer;
