/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Form,Table,Button,Modal,Input,Popconfirm } from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import DomainFormViewer from './DomainFormViewer';
import DomainManagerProcessor from './DomainManagerProcessor';
import  SynchronizationViewer from './SynchronizationViewer';
import  ReAuthorizeViewer from './ReAuthorizeViewer';
const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    className:"column-money",
    render: (text, record, index) =>index+1,
    width:32,
}, {
  title: '医院名称',
  dataIndex: 'hospitalName',
  key: 'hospitalName',
  className:"column-money",
    sorter: (a, b) => a.hospitalName.localeCompare(b.hospitalName),

}, {
  title: '医院等级',
  dataIndex: 'hospitalLevel',
  key: 'hospitalLevel',
  className:"column-money",
  sorter: (a, b) => a.hospitalLevel - b.hospitalLevel,
}, {
  title: '医院属性',
  dataIndex: 'hospitalAttr',
  key: 'hospitalAttr',
    className:"column-money",
  sorter: (a, b) => a.hospitalAttr - b.hospitalAttr,
}, {
  title: '联系人',
  dataIndex: 'contacts',
  key: 'contacts',
    className:"column-money",
    sorter: (a, b) => a.contacts.localeCompare(b.contacts),
}, {
  title: '城市',
  dataIndex: 'city',
  key: 'city',
    className:"column-money",
  sorter: (a, b) => a.city.length - b.city.length,
}, {
  title: '地址',
  dataIndex: 'address',
  key: 'address',
  className:"column-money",
    sorter: (a, b) => a.address.localeCompare(b.address),
}, {
  title: '邮编',
  dataIndex: 'zipcode',
  key: 'zipcode',
  className:"column-money",
  sorter: (a, b) => a.zipcode - b.zipcode,
}, {
  title: '手机',
  dataIndex: 'phone',
  key: 'phone',
  className:"column-money",
  sorter: (a, b) => a.phone - b.phone,
}, {
  title: 'token',
  dataIndex: 'token',
  key: 'token',
  className:"column-money",
  width:160,
  sorter: (a, b) => a.token.length - b.token.length,
}, {
    title: '是否停用',
    dataIndex: 'isStop',
    key: 'isStop',
    className:"column-money",
    sorter: (a, b) => a.isStop - b.isStop,
    // render: text => <p>{text==0?'停用':'启用'}</p>,
  }, {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
    className:"column-money",
    sorter: (a, b) => a.url.length - b.url.length,
  }, {
    title: '公有私有',
    dataIndex: 'isPrivate',
    key: 'isPrivate',
    className:"column-money",
    sorter: (a, b) => a.isPrivate - b.isPrivate,
    render: text => <p>{text==0?'公有':'私有'}</p>,
  }];
const data = [];

const processor=new DomainManagerProcessor();
const pagination =[];

class DomainManagerViewer extends React.Component {
  state = {
    pagination,
    data,
    selectedRowKeys: [],
    formCriteria:'',
    flag:true,
    selectedRows:[]
  };

  componentWillReceiveProps(newProps)
  {
    this.setState({
      selectedRowKeys:[]
    })
  };
  handleTableChange = (pagination, filters, sorter) =>
  {
    var condition=this.props.DomainQuery;
    if(pagination!=null) {
      processor.tableChange(pagination,condition, this.props);
    }
  };

  onSelectChange = (selectedRowKeys,selectedRows) => {
  this.state.selectedRows=selectedRows;
    this.setState({ selectedRowKeys });
    console.log(this.state.selectedRows);
  };
  render() {
    const  {data} = this.props;
    const  {pagination} = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div >
        <div style={{width:'100%',display:'inline-block'}}>
          <ReAuthorizeViewer    dispatch={this.props.dispatch} selectedRowKeysJur={this.state.selectedRowKeys} selectedRows={this.state.selectedRows} data={data==null?this.state.data:data} />
          <DomainFormViewer  formCriteria={this.state.formCriteria}  data={data==null?this.state.data:data} dataSource={this.state.dataSource} selectedRows={this.state.selectedRows} selectedRowKeys={this.state.selectedRowKeys} dispatch={this.props.dispatch} userInfo={this.state.data[selectedRowKeys]}/>
          <SynchronizationViewer dispatch={this.props.dispatch} selectedRowKeysJur={this.state.selectedRowKeys}  selectedRows={this.state.selectedRows} data={data==null?this.state.data:data} />
        </div>
          <Table bordered rowKey="domainId" rowSelection={rowSelection} columns={columns} pagination={pagination} dataSource={data} onChange={this.handleTableChange}/>
      </div>
    );
  }
}

const mapAccountStateToProps = state => ({
  data : state.DomainQuery.data,
  pagination : state.DomainQuery.pagination,
  params:state.DomainQuery.params,
});
const  domainManagerViewer =Form.create()(DomainManagerViewer);
export default connect(
  mapAccountStateToProps
)(domainManagerViewer);
