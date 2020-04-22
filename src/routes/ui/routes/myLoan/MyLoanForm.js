import React from 'react';
import {Message,DatePicker,Upload,Tooltip,Icon,Cascader,Checkbox,Select,AutoComplete,Form,Row,Col,Card,Modal,Layout, Input,Menu,Button } from 'vdap-ui';

const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const { Option, OptGroup } = Select;

class MyLoanForm extends React.Component{
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  onChange=(date, dateString)=> {
    console.log(date, dateString);
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render(){
  	 const { getFieldDecorator } = this.props.form;
  	 const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const props = {
	  name: 'file',
	  action: '//jsonplaceholder.typicode.com/posts/',
	  headers: {
	    authorization: 'authorization-text',
	  },
	  onChange(info) {

	    if (info.file.status === 'done') {
	      Message.success(`${info.file.name} 文件上传成功！`);
	    } else if (info.file.status === 'error') {
	      Message.error(`${info.file.name} 文件上传失败！`);
	    }
	  },
	};

  	 return (
      <Form style={{fontSize:'14px',color:'#666666'}} onSubmit={this.handleSubmit}>
      	<div style={{height:'57vh',overflow:'auto'}}>
      	<Row>
	      <Col span={10}>
	        <FormItem {...formItemLayout}
	          label="事    由"
	          hasFeedback
	        >
	          {getFieldDecorator('reason', {
	            rules: [{
	              required: true, message: '请填写事由！',
	            }],initialValue: "科室器械采购",
	          })(
	            <Input style={{ width: '90%' }} />
	          )}
	        </FormItem>
	      </Col>
	      <Col span={10}>
	        <FormItem {...formItemLayout}
	          label="借款金额"
	          hasFeedback
	        >
	          {getFieldDecorator('loanMoney', {
	            rules: [{
	              required: true, message: '请填写借款金额！',
	            }],initialValue: "6,000.00",
	          })(
	            <Input addonBefore="￥" style={{ width: '90%' }} />
	          )}
	        </FormItem>
	      </Col>
        </Row>
        <Row>
	      <Col span={10}>
	        <FormItem {...formItemLayout}
	          label="借款人"
	          hasFeedback
	        >
	          {getFieldDecorator('loaner', {
	            rules: [{
	              required: true, message: '请填写借款人！',
	            }],initialValue: "李萍",
	          })(
	            <Select style={{width:'90%'}}>
			      <Option value="李萍">李萍</Option>
			      <Option value="张三">张三</Option>
			      <Option value="李四">李四</Option>
			      <Option value="王五">王五</Option>
			    </Select>
	          )}
	        </FormItem>
	      </Col>
	      <Col span={10}>
	        <FormItem {...formItemLayout}
	          label="借款日期"
	          hasFeedback
	        >
	          {getFieldDecorator('date-picker', {
	          	rules: [{ type: 'object', required: true, message: '请填写借款日期！' }],
	            })(
	            <DatePicker style={{width:'90%'}} />
	          )}
	        </FormItem>
	      </Col>
        </Row>
        <br />

        <Row>
	      <Col span={10}>
	        <FormItem {...formItemLayout}
	          label="借款类型"
	          hasFeedback
	        >
	          {getFieldDecorator('loantype', {
	            rules: [{
	              required: true, message: '请选择借款类型！',
	            }],initialValue: "差旅借款单",
	          })(
	            <Select style={{width:'90%'}}>
			      <Option value="差旅借款单">差旅借款单</Option>
			      <Option value="备用金">备用金</Option>
			      <Option value="职工借支">职工借支</Option>
			      <Option value="科室借款">科室借款</Option>
			      <Option value="职工借款">职工借款</Option>
			      <Option value="其他借款">其他借款</Option>
			    </Select>
	          )}
	        </FormItem>
	      </Col>
	      <Col span={10}>
	        <FormItem {...formItemLayout}
	          label="项    目"
	          hasFeedback
	        >
	          {getFieldDecorator('project', {

	          })(
	            <Select style={{width:'90%'}}>
				    <OptGroup label="第一科室项目">
				      <Option value="project1">采购项目</Option>
				      <Option value="ratio1">药品比价</Option>
				    </OptGroup>
				    <OptGroup label="第二科室项目">
				      <Option value="project2">采购项目</Option>
				      <Option value="ratio2">药品比价</Option>
				    </OptGroup>
				</Select>
	          )}
	        </FormItem>
	      </Col>
        </Row>
        <Row>
	      <Col span={10}>
	        <FormItem {...formItemLayout}
	          label="业务科室"
	          hasFeedback
	        >
	          {getFieldDecorator('business', {
	            rules: [{
	              required: true, message: '请填写业务科室！',
	            }],initialValue: "科室一",
	          })(
	            <Select style={{width:'90%'}}>
			      <Option value="科室一">科室一</Option>
			      <Option value="科室二">科室二</Option>
			    </Select>
	          )}
	        </FormItem>
	      </Col>
	      <Col span={10}>
	        <FormItem {...formItemLayout}
	          label="归口科室"
	          hasFeedback
	        >
	          {getFieldDecorator('unified', {
	          	rules: [{required: true, message: '请填写归口科室！' }],initialValue: "科室一",
	            })(
	            <Select style={{width:'90%'}}>
			      <Option value="科室一">科室一</Option>
			      <Option value="科室二">科室二</Option>
			    </Select>
	          )}
	        </FormItem>
	      </Col>
        </Row>
        <br />

        <Row>
	      <Col span={10}>
	        <FormItem {...formItemLayout}
	          label="附件"
	        >
	          {getFieldDecorator('upload', {
	            valuePropName: 'fileList',
	            getValueFromEvent: this.normFile,
	          })(
	            <Upload {...props}>
	              <Button>
	                <Icon type="upload" /> 上传附件
	              </Button>
	            </Upload>
	          )}
	        </FormItem>
	      </Col>
        </Row>
        </div>
        <div style={{position:"absolute",top:"1500px"}} />


	        <hr/>
	    	<Row gutter={12} style={{paddingTop:'10px'}}>
	          <Col span={2} offset={15} ><Button>取消</Button></Col>
		      <Col span={2}><Button>删除</Button></Col>
		      <Col span={2}><Button onClick={this.handleSubmit}>保存</Button></Col>
		      <Col span={2}><Button onClick={this.handleSubmit} type="primary">提交审批</Button></Col>
			</Row>
      </Form>
    )
  }
}

export default Form.create()(MyLoanForm);
