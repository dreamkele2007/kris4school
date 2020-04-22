/**
 * Created by GM on 2017/7/18.
 */
import React from 'react';
import {Table } from 'antd';
import 'antd/dist/antd.css';
import { NavLink as Link } from 'react-router-dom'
import {connect} from 'react-redux';
import NoticeRecordFormViewer from './NoticeRecordFormViewer';
import  noticeRecordProcessor from './noticeRecordProcessor'

const data = [];
const pagination=[];
const selectedRowKeys = [];
const processor =new noticeRecordProcessor();
const columns = [{
  title: '序号',
  dataIndex: 'key',
  key: 'key',
  className:"column-money",
  render: (text, record, index) =>index+1,
  width:32,
},{
  title: 'ID',
  dataIndex: 'messageId',
  key:'messageId',
  className:"column-money",
  sorter: (a, b) => a.messageId - b.messageId
},{
  title: '通知时间',
  dataIndex: 'createDatetime',
  key:'createDatetime',
  className:"column-money",
  sorter: (a, b) => a.createDatetime - b.createDatetime,
  render: text =>{
    return new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
  }
}, {
  title: '租户',
  dataIndex: 'hospitalName',
  className:"column-money",
  sorter: (a, b) => a.hospitalName - b.hospitalName
}, {
  title: '新增数',
  dataIndex: 'newNum',
  className:"column-money",
  sorter: (a, b) => a.newNum - b.newNum,
  render: (text,record) => <Link to={`/gs1/result/AddDataViewer?name=add&id=`+record.matchId}>{text}</Link>,
},{
  title: '更新数',
  dataIndex: 'updateNum',
  className:"column-money",
  sorter: (a, b) => a.updateNum - b.updateNum,
  render: (text,record) => <Link to={`/gs1/result/AddDataViewer?name=updata&id=`+record.matchId} >{text}</Link>,
},{
  title: '注销数',
  dataIndex: 'cancelNum',
  className:"column-money",
  sorter: (a, b) => a.cancelNum - b.cancelNum,
  render: (text,record) => <Link to={`/gs1/result/AddDataViewer?name=cancel&id=`+record.matchId} >{text}</Link>,
},{
  title: '是否回调',
  dataIndex: 'callback',
  className:"column-money",
  sorter: (a, b) => a.callback - b.callback,
  render: (text,record) => {
    if(text==3){
      return '否'
    }else if(record.isSuccess=='成功'){
      return '否'
    }else{
      return '是'
    }
  }
},{
  title: '回调次数',
  dataIndex: 'callbackNum',
  className:"column-money",
  sorter: (a, b) => a.callbackNum - b.callbackNum,

},{
  title: '回调状态',
  dataIndex: 'isSuccess',
  className:"column-money",
  sorter: (a, b) => a.callBackState - b.callBackState,
  render: (text,record) => {
    if(record.callbackNum==0){
      return '无'
    }else {
      return text
    }
  }
}];
class NoticeRecordManagerViewer extends React.Component {
  state = {
    data,
    pagination:{pageSize:1},
    selectedRowKeys: []
  };
  componentWillReceiveProps(newProps) {
    if(newProps!=null&&newProps.condition!=null) {
      processor.formChange({total:0,pageSize:10,current:1,defaultCurrent:1},newProps.condition, this);
    }
  };


  handleTableChange = (pagination, filters, sorter) => {
    var condition =this.props.condition;
    if(pagination!=null) {
      processor.formChange(pagination,condition,this);
    }
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  render() {
    const {selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <div>
          <NoticeRecordFormViewer  selectedRowKeys={this.state.selectedRowKeys}  data={this.state.data}  dispatch={this.props.dispatch} />
        </div>
        <div>
          {/*rowSelection={rowSelection}*/}
          <Table bordered rowKey="messageId" style={{marginTop:5}} pagination={this.state.pagination} onChange={this.handleTableChange} columns={columns} dataSource={this.state.data} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    condition:store.NoticeQUERY.condition
  }
};

export default connect(
  mapStateToProps
)(NoticeRecordManagerViewer);
