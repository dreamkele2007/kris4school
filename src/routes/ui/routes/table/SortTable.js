import React from 'react';
import { Table } from 'vdap-ui';

class SortTable extends React.Component{

  onChange =(pagination, filters, sorter) =>{
    console.log('params', pagination, filters, sorter);
  }

  render(){
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      width:'25%',
      filters: [{
        text: 'Joe',
        value: 'Joe',
      }, {
        text: 'Jim',
        value: 'Jim',
      }, {
        text: 'Submenu',
        value: 'Submenu',
        children: [{
          text: 'Green',
          value: 'Green',
        }, {
          text: 'Black',
          value: 'Black',
        }],
      }],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
    }, {
      title: '年龄',
      dataIndex: 'age',
      width:'25%',
      sorter: (a, b) => a.age - b.age,
    }, {
      title: '地址',
      dataIndex: 'address',
      width:'50%',
      filters: [{
        text: 'London',
        value: 'London',
      }, {
        text: 'New York',
        value: 'New York',
      }],
      filterMultiple: false,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => a.address.length - b.address.length,
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
    }, {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    }, {
      key: '5',
      name: 'Jim Red',
      age: 37,
      address: 'London No. 2 Lake Park',
    }, {
      key: '6',
      name: 'Jim Red',
      age: 38,
      address: 'London No. 2 Lake Park',
    }, {
      key: '7',
      name: 'Jim Red',
      age: 38,
      address: 'London No. 2 Lake Park',
    }, {
      key: '8',
      name: 'Jim Red',
      age: 39,
      address: 'London No. 2 Lake Park',
    }, {
      key: '10',
      name: 'Jim Red',
      age: 40,
      address: 'London No. 2 Lake Park',
    }, {
      key: '11',
      name: 'Jim Red',
      age: 44,
      address: 'London No. 2 Lake Park',
    }, {
      key: '12',
      name: 'Jim Red',
      age: 11,
      address: 'London No. 2 Lake Park',
    }, {
      key: '13',
      name: 'Jim Red',
      age: 2,
      address: 'London No. 2 Lake Park',
    }];

    return (
        <Table bordered columns={columns} dataSource={data} onChange={this.onChange} size='middle' />
      )
  }


}

export default SortTable;
