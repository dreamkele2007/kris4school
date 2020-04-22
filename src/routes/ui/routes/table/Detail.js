import React from 'react';
import { Form,Input,Modal,Table, Icon } from 'vdap-ui';
const FormItem = Form.Item;

class Detail extends React.Component{
 state = { visible: false }
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

  render(){
    const columns = [{
    title: '编号',
    dataIndex: 'key',
    key: 'key',
     render: (text, record) => (
      <span>
        <a href="#" onClick={this.showModal}>{text}</a>
        <Modal
          title="详细信息"
          visible={this.state.visible}
          closable
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <Form layout="inline">
            <FormItem>编号：<Input defaultValue={text} /></FormItem>
            <FormItem>姓名：<Input defaultValue={record.name} /></FormItem>
            <FormItem>年龄：<Input defaultValue={record.age} /></FormItem>
            <FormItem>地址：<Input defaultValue={record.address} /></FormItem>
          </Form>
        </Modal>
      </span>
    ),
  },{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  }];

  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }];

    return (
      <Table bordered columns={columns} dataSource={data} size='middle' />
    )
  }
}

export default Detail;