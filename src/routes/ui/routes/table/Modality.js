import React from 'react';
import { Popover,Table, Icon } from 'vdap-ui';

class Modality extends React.Component{

  render(){
    const columns = [{
    title: '编号',
    dataIndex: 'key',
    width:'25%',
    key: 'key',
     render: (text, record) => (
      <Popover placement="rightTop" title={text} content={`${record.name} , ${record.age} , ${record.address}`} trigger="click">
        <a href="#">{text}</a>
      </Popover>
    ),
  },{
    title: '姓名',
    dataIndex: 'name',
    width:'25%',
    key: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    width:'25%',
    key: 'age',
  }, {
    title: '地址',
    dataIndex: 'address',
    width:'25%',
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
      <Table bordered columns={columns} dataSource={data} size='middle'  />
    )
  }
}

export default Modality;