import React from 'react';
import {withRouter} from 'react-router'
import {Tabs, Form, Button, Input, Icon} from 'antd';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class Login extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const {form, history} = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        history.push('/kris');
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div style={{
        width: document.body.width,
        height: '100vh',
        position: 'relative',
        backgroundImage: 'linear-gradient(-90deg, #4f8aee 3%, #90000A 100%)',
        overflow: 'hidden'
      }}>
        <div style={{textAlign:'center',lineHeight: '1100px',position: 'absolute', height: '1100px', width: '1100px', top: '12%', overflow: 'hidden'}}>
          <img style={{borderRadius:'50%'}} src={require('assets/images/ui/university.png')}/>
        </div>
        <div style={{marginTop: '-150px', marginLeft: '-160px', position: 'absolute', left: '70%', top: '50%'}}>
          <Tabs style={{
            width: '350px',
            height: '370px',
            padding: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            boxShadow: '0 0 20px 0 rgba(0,0,0,0.04), 0 20px 31px 0 rgba(0,0,0,0.30)'
          }} defaultActiveKey="0" >
            <TabPane tab="账号登陆" key="0">
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{required: true, message: '请输入账号!'}],
                  })(
                    <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="账号"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{required: true, message: '请输入密码!'}],
                  })(
                    <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="密码"/>
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit" style={{
                  height: '38px',
                  width: '100%',
                  backgroundImage: 'linear-gradient(-90deg, #4f8aee 3%, #90000A 100%)'
                }}>
                  登录
                </Button>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
const WrappedLoginForm = Form.create()(Login);


export default withRouter(WrappedLoginForm);
