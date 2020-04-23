import React, {Component} from 'react';
import {Form, Input} from 'antd';
const FormItem = Form.Item;
class SiteForm extends Component {

  getFormValue  = () => {                          //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
    const values= this.props.form.getFieldsValue();  //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
    return values;
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form; 
    const {item} = this.props;
    const formItemLayout =  {
      labelCol:   { span: 4 },
      wrapperCol: { span: 14 },
    }
    return (
      <Form layout={"horizontal"}>
       <FormItem   {...formItemLayout}>
          {
           getFieldDecorator('id',{initialValue:item.id || ''})(<Input type="hidden" disabled={!this.props.edit} />)
          }
          </FormItem>
        <FormItem label="站点名称"  {...formItemLayout}>
          {getFieldDecorator('siteName', {initialValue:item.siteName,
            rules: [{required: true, message: 'name is required!'}],
          })(<Input disabled={!this.props.edit} />)}
        </FormItem >
        <FormItem label="站点IP" {...formItemLayout}>
          {getFieldDecorator('siteIp', {initialValue:item.siteIp || '',
            rules: [{required: true, message: 'ip is required!'}],
          })(<Input addonBefore="Http://"  disabled={!this.props.edit}/>)}
        </FormItem>
      </Form>
    )
  }
}


const onFieldsChange = (props, changedFields) => {
}


const onValuesChange = (_, values) => {
  console.log('SiteForm:onValuesChange');
}
export default Form.create({
  onFieldsChange,
  onValuesChange
})(SiteForm);
