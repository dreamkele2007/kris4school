/**
 * Created by admin on 2017/7/10.
 */
import React, {Component} from 'react';
import { Table,Button } from 'antd';
import { NavLink as Link } from 'react-router-dom'
import Processor from './updateRecordManuDownLoadInfoProcessor';
import {connect} from 'react-redux';
const columns = [{
  title: '序号',
  dataIndex: 'key',
  key: 'key',
  className:"column-money",
  render: (text, record, index) =>index+1,
  width:32,
},
  { title: 'ID', dataIndex: 'downId',className:'column-money',
    sorter: (a, b) => a.productName.length - b.productName.length},
  { title: '厂商名称', dataIndex: 'manuName',className:'column-money',
    sorter: (a, b) => a.manuName.length - b.manuName.length},
  { title: '下载总数', dataIndex: 'downNum',className:'column-money',
    sorter: (a, b) => a.downNum - b.downNum}
];
const  processor=new Processor();
class UpdateRecordManuDownLoadInfoViewer extends Component{

  //获取url后面参数
  getUrlParam=(name)=> {
    var reg = new RegExp("[?&]" + name + "=([^?&]*)[&]?", "i");
    var match = this.props.location.search.match(reg);
    // `/gs1/result/UpdateRecordManagerViewer`
    console.log(this.props.location.pathname);
    console.log(document.referrer)
    debugger
    // /gs1/result/ManuDownLoadInfoViewer
    return match == null ? "" : match[1];
  }
  componentWillMount() {
    var downId=this.getUrlParam('downId');
    processor.queryDownLoadData({total:0,pageSize:10,current:1,defaultCurrent:1},downId,this.props);
  }
  handleTableChange = (pagination, filters, sorter) => {
    if (pagination != null) {
      var downId=this.getUrlParam('downId');
      processor.queryDownLoadData(pagination,downId, this.props);
    }
  };
  render() {
    const  {data} = this.props;
    const  {pagination} = this.props;
    return (
      <div>
        <div>
          <Button type="primary">

            <Link to={`/gs1/result/UpdateRecordManagerViewer`}>返回</Link>
          </Button>
        </div>
        <div>
          <Table bordered style={{marginTop:5}} columns={columns} dataSource={data} pagination={pagination} onChange={this.handleTableChange}/>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (store) => {
  return {
    data:store.updateRecordManuInfoReducer.data,
    pagination:store.updateRecordManuInfoReducer.pagination,
  }
};

export default connect(
  mapStateToProps
)(UpdateRecordManuDownLoadInfoViewer);
