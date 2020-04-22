import React from 'react';
import { Table, Icon } from 'vdap-ui';
class FixCol extends React.Component{

  render(){
  	const columns = [
	  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
	  { title: '年龄', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
	  { title: '列 1', dataIndex: 'address', key: '1' },
	  { title: '列 2', dataIndex: 'address', key: '2' },
	  { title: '列 3', dataIndex: 'address', key: '3' },
	  { title: '列 4', dataIndex: 'address', key: '4' },
	  { title: '列 5', dataIndex: 'address', key: '5' },
	  { title: '列 6', dataIndex: 'address', key: '6' },
	  { title: '列 7', dataIndex: 'address', key: '7' },
	  { title: '列 8', dataIndex: 'address', key: '8' },
	  {
	    title: '操作',
	    key: 'operation',
	    fixed: 'right',
	    width: 100,
	    render: () => <a href="#">action</a>,
	  },
	];

	const data = [{
	  key: '1',
	  name: 'John Brown',
	  age: 32,
	  address: 'New York Park',
	}, {
	  key: '2',
	  name: 'Jim Green',
	  age: 40,
	  address: 'London Park',
	}];

  	 return (
      <Table bordered columns={columns} dataSource={data} size='middle' scroll={{ x: 1300}}/>
    )
  }
}

export default FixCol;
