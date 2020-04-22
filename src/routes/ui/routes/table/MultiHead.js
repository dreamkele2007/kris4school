import React from 'react';
import { Table } from 'vdap-ui';

class MultiHead extends React.Component{
  render(){
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      fixed: 'left',
      filters: [{
        text: 'Joe',
        value: 'Joe',
      }, {
        text: 'John',
        value: 'John',
      }],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    }, {
      title: '其他',
      children: [{
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 200,
        sorter: (a, b) => a.age - b.age,
      }, {
        title: '地址',
        children: [{
          title: '街道',
          dataIndex: 'street',
          key: 'street',
          width: 200,
        }, {
          title: '地区',
          children: [{
            title: '建筑物',
            dataIndex: 'building',
            key: 'building',
            width: 100,
          }, {
            title: '门牌号',
            dataIndex: 'number',
            key: 'number',
            width: 100,
          }],
        }],
      }],
    }, {
      title: '公司',
      children: [{
        title: '公司地址',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
      }, {
        title: '公司名称',
        dataIndex: 'companyName',
        key: 'companyName',
      }],
    }, {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      width: 60,
      fixed: 'right',
    }];

    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: 'John Brown',
        age: i + 1,
        street: 'Lake Park',
        building: 'C',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',
      });
    }

    return(
      <Table bordered columns={columns} dataSource={data} size="middle" pagination={{ pageSize: 17 }} scroll={{ x: '130%'}}/>
    );
  }
}
export default MultiHead;
