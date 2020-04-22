import React, {Component} from 'react';
import {Card, Table} from 'antd';


const columns = [{
  title: '系统名称',
  dataIndex: 'siteName',
  key: 'name',
}, {
  title: '系统IP',
  dataIndex: 'siteIp',
  key: 'siteIp',
}];
class Users extends Component {
  render() {
    const {list} = this.props;
    return (
      <Card>
        <Table dataSource={list} columns={columns}/>
      </Card>
    )
  }
}


export default Users;

