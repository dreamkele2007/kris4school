/**
 * Created by GM on 2017/7/18.
 */
import React from 'react';
import {Table} from 'antd';
import { NavLink as Link } from 'react-router-dom'
import {connect} from 'react-redux';
import UpdateRecordFormViewer from './UpdateRecordFormViewer';
import updateRecordManagerProcessor from './updateRecordManagerProcessor'

const pro = new updateRecordManagerProcessor();
class UpdateRecordManagerViewer extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      className:"column-money",
      render: (text, record, index) =>index+1,
      width:32,
    },{
      title: '下载时间',
      dataIndex: 'downTime',
      className:'column-money',
      key:'downTime',
      sorter: (a, b) => a.downTime - b.downTime,
      render: (text,record) =>
        <Link to={`/gs1/result/UpdateRecordManuDownLoadInfoViewer?downId=`+record.downId} >{new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")}</Link>
        /*<Link to={`/gs1/result/UpdateRecordManagerViewer/UpdateRecordManuDownLoadInfoViewer?downId=`+record.downId} >{new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")}</Link>*/
    }, {
      title: '更新类型' ,
      dataIndex: 'downType',
      className:'column-money',
      sorter: (a, b) => a.downType.length - b.updateType.length,
      render: (text,record) => <p>{text==1?'手动':'自动'}</p>
      // render: text => {
      //   for(var i=0;i<this.state.downType.length;i++){
      //     if(text==this.state.downType[i].codeValue){
      //       return this.state.downType[i].codeName;
      //     }
      //   }
      // }
    }, {
      title: '更新时间',
      dataIndex: 'matchDatetime',
      className:'column-money',
      sorter: (a, b) => a.matchDatetime - b.matchDatetime,
      render: (text,record) => new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
    }, {
      title: '更新人',
      dataIndex: 'dowmBy',
      className:'column-money',
      sorter: (a, b) => a.dowmBy.length - b.dowmBy.length,
    },{
      title: '新增数',
      dataIndex: 'newNum',
      className:'column-money',
      sorter: (a, b) => a.newNum - b.newNum,
      render: (text,record) => <Link to={`/gs1/result/UpdateRecordDataViewer?name=add&id=`+record.matchId} >{text}</Link>,
    },{
      title: '更新数',
      dataIndex: 'updateNum',
      className:'column-money',
      sorter: (a, b) => a.updateNum - b.updateNum,
      render: (text,record) =><Link to={`/gs1/result/UpdateRecordDataViewer?name=update&id=`+record.matchId} >{text}</Link>,
    },{
      title: '注销数',
      dataIndex: 'cancelNum',
      className:'column-money',
      sorter: (a, b) => a.cancelNum - b.cancelNum,
      render: (text,record) =><Link to={`/gs1/result/DataViewerRecord?name=cancel&id=`+record.matchId} >{text}</Link>,
    },{
      title: '状态',
      dataIndex: 'status',
      className:'column-money',
      sorter: (a, b) => a.status - b.status,
      render: (text,record) => <p>{text==1?'新生成':text==2?'已入库':'已作废'}</p>
    }];
  }
  state = {
    statusType:[],
    downType:[],
  };
  // 下拉查询
  componentWillMount() {
    pro.queryDictTypeList(data => {
      //下面的就是请求来的数据
      var result = data.getSinglePrimaryList();
      this.setState({
        statusType:result
      })
    });
    // 执行类型
    pro.queryDownTypes(data =>{
      var result = data.getSinglePrimaryList();
      this.setState({
        downType:result
      })
    })
  }
  // 分页查询
  handleTableChange = (pagination, filters, sorter) => {
    if(pagination!=null) {
      var condition=this.props.condition;
      pro.handleTableChange(pagination,condition,this.props);
    }
  };
  render() {
    const  {data} = this.props;
    const  {pagination} = this.props;
    return (
      <div>
        <div>
          <UpdateRecordFormViewer statusType={this.state.statusType} dispatch={this.props.dispatch}  />
        </div>
        <Table bordered rowKey="matchId" style={{marginTop:5}}  onChange={this.handleTableChange} dataSource={data} pagination={pagination}  columns={this.columns}  />
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    data:store.updateRecordReducer.data,
    pagination:store.updateRecordReducer.pagination,
    condition:store.updateRecordReducer.condition
  }
};

export default connect(
  mapStateToProps
)(UpdateRecordManagerViewer);
