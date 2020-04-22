import React from 'react';
import {
  Tooltip,
  Icon,
  Cascader,
  Checkbox,
  Select,
  AutoComplete,
  Form,
  Row,
  Col,
  Card,
  Modal,
  Layout,
  Input,
  Menu,
  Button
} from 'vdap-ui';
import MyLoanForm from './MyLoanForm.js';
const Option = Select.Option;

const {Header, Footer, Sider, Content} = Layout;
const Search = Input.Search;
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;

class MyLoan extends React.Component {
  state = {
    visible: false
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }

  render() {

    return (
      <div>
        <Layout>
          <Sider width={290} style={{
            height: '80vh',
            borderRight: '1px solid #eee',
            backgroundColor: 'white',
            overflow: 'auto',
            overflowX: 'hidden'
          }}>
            <div style={{marginLeft: '10px', marginTop: "20px"}}>
              <Search
                placeholder="搜索借款单名称和单号"
                style={{width: "92%"}}
                onSearch={value => console.log(value)}
              />
              <br />
              <div style={{paddingTop: '10px'}}>
                <Button onClick={this.showModal} style={{width: "92%"}} type="primary" icon="plus">新增借款</Button>
              </div>
              <br />
              <Menu mode="inline" style={{fontSize: '14px', color: '#333333'}}>
                <Menu.Item>已完成的借款</Menu.Item>
                <SubMenu title="我的借款">
                  <Menu.Item>
                    <div style={{fontSize: '14px', color: '#333333', height: '17px'}}>
                      科室器材采购
                      <div style={{fontSize: '14px', color: '#333333', float: 'right'}}>
                        ¥6,000.00
                      </div>
                    </div>
                    <div style={{height: '14px', fontSize: '12px', color: '#999999'}}>
                      差旅借款单
                      <div style={{fontSize: '12px', color: '#333333', float: 'right', marginRight: 0}}>
                        未提交
                      </div>
                    </div>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </div>
          </Sider>
          <Layout>
            <div style={{margin: '20px'}}>
              <div style={{display: 'inline-block'}}>
                <img src={require('assets/images/ui/15.png')}/>
              </div>
              <div style={{display: 'inline-block', marginLeft: '20px'}}>
                <p style={{fontSize: '16px', color: '#333333'}}>我的差旅借款</p>
                <p style={{fontSize: '12px', color: '#666666'}}>借款金额 J00929</p>
              </div>
              <div style={{fontSize: '30px', color: '#4e92f5', marginLeft: '60px',marginTop:'-16px',marginBottom:'26px'}}>¥6,000.00</div>
              <span style={{display: 'inline-block', background: '#4e92f5', width: '4px', height: '21px',paddingTop:'20px',verticalAlign:'top'}}></span>

              <span style={{
                display: 'inline-block',
                margin: '0 0 20px 36px',
                fontSize: '16px',
                color: '#333333'
              }}>借款信息</span>

              <MyLoanForm />
            </div>
          </Layout>
        </Layout>
        <Modal
          title=""
          width='880px'
          style={{top: '300px', left: '500px', position: 'absolute'}}
          visible={this.state.visible}
          closable
          onCancel={this.hideModal}
          footer={null}
        >
          <div style={{height: '340px'}}>
            <div style={{fontSize: '16px', color: '#999999'}}>请选择填写的借款单</div>
            <div style={{paddingTop: "30px", marginLeft: "150px"}}>
              <Row gutter={16} style={{padding: '5px 0'}}>
                <Col span={6}>
                  <Card bordered={false} style={{width: 90}} bodyStyle={{padding: 0}}>
                    <center>
                      <img src={require('assets/images/ui/16.png')}/>
                      <div style={{fontSize: '14px', color: '#333333'}}>差旅费借款</div>
                    </center>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card bordered={false} style={{width: 90}} bodyStyle={{padding: 0}}>
                    <center>
                      <img src={require('assets/images/ui/17.png')}/>
                      <div style={{fontSize: '14px', color: '#333333'}}>备用金</div>
                    </center>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card bordered={false} style={{width: 90}} bodyStyle={{padding: 0}}>
                    <center>
                      <img src={require('assets/images/ui/18.png')}/>
                      <div style={{fontSize: '14px', color: '#333333'}}>职工借支</div>
                    </center>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card bordered={false} style={{width: 90}} bodyStyle={{padding: 0}}>
                    <center>
                      <img src={require('assets/images/ui/19.png')}/>
                      <div style={{fontSize: '14px', color: '#333333'}}>科室借款</div>
                    </center>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Card bordered={false} style={{width: 90}} bodyStyle={{padding: 0}}>
                    <center>
                      <img src={require('assets/images/ui/20.png')}/>
                      <div style={{fontSize: '14px', color: '#333333'}}>职工借款</div>
                    </center>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card bordered={false} style={{width: 90}} bodyStyle={{padding: 0}}>
                    <center>
                      <img src={require('assets/images/ui/21.png')}/>
                      <div style={{fontSize: '14px', color: '#333333'}}>其他借款</div>
                    </center>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default MyLoan;
