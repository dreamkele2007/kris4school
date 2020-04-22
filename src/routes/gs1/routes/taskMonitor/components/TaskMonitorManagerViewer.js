/**
 * Created by GM on 2017/7/18.
 */
import React from 'react';
import {Table ,Badge} from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import UpdateRecordFormViewer from './TaskMonitorFormViewer';
import taskMonitorManagerProcessor from './taskMonitorManagerProcessor';
const data= [];
class TaskMonitorManagerViewer extends React.Component {
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
      title: '任务名称',
      dataIndex: 'taskName',className:'column-money',
      key:'name',
      sorter: (a, b) => a.taskName.length - b.taskName.length
    },{
      title: '执行时间',
      dataIndex: 'execTime',className:'column-money',
      key:'runTime',
      sorter: (a, b) => a.execTime - b.execTime,
      render: text =>{
        return new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      }
    }, {
      title: '执行类型',
      dataIndex: 'execType',className:'column-money',
      sorter: (a, b) => a.execType - b.execType,
      render:text =><p>{text=='1'?'手动':'自动'}</p>
    }, {
      title: '执行人',
      dataIndex: 'execBy',className:'column-money',
      sorter: (a, b) => a.execBy.length - b.execBy.length,
    }, {
      title: '是否成功',
      dataIndex: 'isSuccess',className:'column-money',
      sorter: (a, b) => a.isSuccess - b.isSuccess,
      render: text => {
        if(text=='1') {
          return <span><Badge status="success" />成功</span>
        }else {
           return <span><Badge status="error" />失败</span>
        }
      }
      // render: () => <span><Badge status="success" />Finished</span>,
      // render:text =><p>{text=='1'?'成功':'失败'}</p>
    }];
  }

  state = {
    data,
    pagination:{pageSize:10},
  };
  componentWillReceiveProps(newProps)
  {
    console.log(newProps)
    if(newProps!=null&&newProps.condition!=null)
    {
      const ump = new taskMonitorManagerProcessor();
      ump.modelChange(null,newProps.condition, this);
    }
  };


  handleTableChange = (pagination, filters, sorter) =>
  {
    if(pagination!=null) {
      const ump = new taskMonitorManagerProcessor();
      ump.handleTableChange(pagination,null, this);
    }
  };

  render() {
    return (
      <div>
        <div>
          <UpdateRecordFormViewer  selectedRowKeys={this.state.selectedRowKeys}  data={this.state.data}  dispatch={this.props.dispatch} />
        </div>
        <Table bordered rowkey="logId" style={{marginTop:5}}  onChange={this.handleTableChange} pagination={this.state.pagination}  columns={this.columns} dataSource={this.state.data} />
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    condition:store.taskMonitor.condition
  }
};

export default connect(
  mapStateToProps
)(TaskMonitorManagerViewer);
