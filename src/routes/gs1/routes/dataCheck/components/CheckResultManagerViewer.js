/**
 * Created by admin on 2017/7/7.
 */
import React from 'react';
import {Table,Spin} from 'antd'
import {NavLink as Link} from 'react-router-dom'
import {connect} from 'react-redux';
import CheckResultFormViewer from './CheckResultFormViewer'
import checkResultManagerProcessor from './checkResultManagerProcessor'

const pro = new checkResultManagerProcessor();
class DataCheckManuDownLoadInfoViewer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      selectedRowKeys:[],
      statusType:[],
      loading:false,
      downType:[],
    }
		this.columns = [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      className:"column-money",
      render: (text, record, index) =>index+1,
      width:32,
		}, {
			title: '下载时间',
			dataIndex: 'downTime',
      className:'column-money',
			key: 'downTime',
			sorter: (a, b) => a.downTime - b.downTime,
			render: (text, record) =>
				<Link to={`/gs1/result/DataCheckManuDownLoadInfoViewer?downId=`+record.downId} >{new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")}</Link>
		}, {
			title: '更新类型',
			dataIndex: 'downType',
      className:'column-money',
			sorter: (a, b) => a.downType - b.downType,
      render: (text,record) => <p>{text==1?'手动':'自动'}</p>
		// 	render: text => {
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
			render: (text, record) => new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
		}, {
			title: '更新人',
			dataIndex: 'dowmBy',
      className:'column-money',
			sorter: (a, b) => a.dowmBy.length - b.dowmBy.length,
		}, {
			title: '新增数',
			dataIndex: 'newNum',
      className:'column-money',
			sorter: (a, b) => a.newNum - b.newNum,
			render: (text, record) => <Link to={`/gs1/result/DataViewer?name=add&id=`+record.matchId} >{text}</Link>,
		}, {
			title: '更新数',
			dataIndex: 'updateNum',
      className:'column-money',
			sorter: (a, b) => a.updateNum - b.updateNum,
			render: (text, record) => <Link to={`/gs1/result/DataViewer?name=update&id=`+record.matchId} >{text}</Link>,
		}, {
			title: '注销数',
			dataIndex: 'cancelNum',
      className:'column-money',
			sorter: (a, b) => a.cancelNum - b.cancelNum,
			render: (text, record) => <Link to={`/gs1/result/DataViewer?name=cancel&id=`+record.matchId} >{text}</Link>,
		}, {
			title: '状态',
			dataIndex: 'status',
      className:'column-money',
			sorter: (a, b) => a.status - b.status,
      render: (text,record) => <p>{text==1?'新生成':text==2?'已入库':'已作废'}</p>
      // render: text =>{
      //   for(var i=0;i<this.state.statusType.length;i++){
      //     if(text==this.state.statusType[i].codeValue){
      //       return this.state.statusType[i].codeName;
      //     }
      //   }
      // } ,
		}];
	}

  componentWillMount() {
	  // 任务类型
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
      console.log(result)
      this.setState({
        downType:result
      })
    })
  }

  componentDidMount(){
    var condition=this.props.condition;
    pro.handleTableChange(null,condition,this.props);
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps->清除选中')
    this.setState({
      selectedRowKeys: [],
      record: []
    })
  }

	// 修改模态框的方法
  changeLoading(loading){
    this.setState({
      loading
    })
  }
  // 分页查询
	handleTableChange = (pagination, filters, sorter) => {
		if (pagination != null) {
      var condition=this.props.condition;
      pro.handleTableChange(pagination,condition,this.props);
		}
	};

  onSelectChange = (selectedRowKeys,record) => {
    this.setState({ selectedRowKeys,record });
  };

	render() {
		const {data} = this.props;
		const {pagination} = this.props;
		const {selectedRowKeys} = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		}
		return (
			<div>
        <Spin tip="正在执行，请稍后。。。" spinning={this.state.loading} >
          <CheckResultFormViewer record={this.state.record}  dispatch={this.props.dispatch} selectedRowKeys={this.state.selectedRowKeys}
                                 changeLoading={loading =>this.changeLoading(loading)} />
          <Table rowKey="matchId" style={{marginTop:5}} bordered rowSelection={rowSelection}  columns={this.columns} dataSource={data} pagination={pagination} onChange={this.handleTableChange}/>
        </Spin>
      </div>
		)
	}
}
const mapStateToProps = (store) => {
	return {
    data:store.checkResultReducer.data,
    pagination:store.checkResultReducer.pagination,
    condition:store.checkResultReducer.condition,
	}
};
export default connect(
	mapStateToProps
)(DataCheckManuDownLoadInfoViewer);
