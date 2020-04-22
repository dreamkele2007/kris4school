import React, {Component} from 'react';
import {Form, Input} from 'antd';
const FormItem = Form.Item;
class SiteForm extends Component {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
        console.log(values);
        this.props.onSubmit(err, values);
    });
}

  render() {
    const {getFieldDecorator} = this.props.form;
    const {item} = this.props;
    const formItemLayout =  {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }
    return (
      <Form onSubmit={this.handleSubmit} layout={"horizontal"}>
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
  // props.onChange(changedFields);
}

const mapPropsToFields = (props) => {
  console.log(props);
  return {};
}
const onValuesChange = (_, values) => {
  console.log(values);
}
export default Form.create({
  mapPropsToFields,
  onFieldsChange,
  onValuesChange
})(SiteForm);
