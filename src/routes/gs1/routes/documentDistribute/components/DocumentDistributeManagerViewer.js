/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Table,Spin,Badge} from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import documentDistributeProcessor from './documentDistributeManagerProcessor';
import DocumentDistributeFormViewer from './DocumentDistributeModelViewer';
var timer ='';
const  processor = new documentDistributeProcessor();
class DocumentDistributeManagerViewer extends React.Component {
  // 初始化props
  constructor(props) {
    super(props);
    // 声明state
    this.state = {
      selectedRowKeys: [],
      record:[],
      dictType:[],
      taskStatu:[],
      timerFlag:false
    };
    // 定义table的列头
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
      key: 'taskName',
      sorter: (a, b) => a.taskName.length - b.taskName.length
    },{
      title: '任务类型',
      dataIndex: 'taskType',className:'column-money',
      sorter: (a, b) => a.taskType - b.taskType,
      render: text =>{
        for(var i=0;i<this.state.dictType.length;i++){
          if(text==this.state.dictType[i].codeValue){
            return this.state.dictType[i].codeName;
          }
        }
      } ,
    },{
      title: '任务间隔',
      dataIndex: 'crontab',className:'column-money',
      key: 'crontab',
      sorter: (a, b) => a.crontab.length - b.crontab.length,
    }, {
      title: '状态',
      dataIndex: 'isRun',
      className:'column-money',
      key: 'isRun',
      sorter: (a, b) => a.isRun - b.isRun,
      render: text => <p>{text==0?'停用':'启用'}</p> // 格式化信息
    },{
      title: '最后执行时间',
      dataIndex: 'execTime',className:'column-money',
      key:'runTime',
      sorter: (a, b) => a.execTime - b.execTime,
      render: text =>{
        if(text!=null){
          return new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        }
      }
    },{
      title: '最后执行状态',
      dataIndex: 'isSuccess',className:'column-money',
      sorter: (a, b) => a.isSuccess - b.isSuccess,
      // render:text =><p>{text=='1'?'成功':text=='0'?'失败':''}</p>
      render: text => {
        if(text==null){
          return '暂无调用'
        }else if(text=='1') {
          return <span><Badge status="success" />成功</span>
        }else {
          return <span><Badge status="error" />失败</span>
        }
      }
    },{
      title: '进度',
      dataIndex: 'taskId',className:'column-money',
      key: 'taskId',
      render: text =>{
        for(var i=0;i<this.state.taskStatu.length;i++){
          if(text==this.state.taskStatu[i].taskId){
            return <Spin type="primary" spinning={this.state.taskStatu[i].status} />;
          }
        }
      }
    },
    ];
  }
  componentWillMount(){
    // 查询任务类型下拉
    processor.queryDictTypeList(data => {
      var result = data.getSinglePrimaryList();
      this.setState({
        dictType: result
      })
    });
  }

  componentDidMount(){
    // 查询任务
    processor.handleTableChange(null,this.props);
    // 查询后台任务信息
    processor.queryTaskStatu(data => {
      var result = data.getSinglePrimaryList();
      this.setState({
        taskStatu: result
      })
      const viewer = this;
      let flag = false;
      for(var i=0;i<result.length;i++){
        if (result[i].status===true){
          flag= true;
        }
      }
      if(flag){
        viewer.controlWebTimer(true);
      }
    });
  }
  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps->清除选中')
    this.setState({
      selectedRowKeys: [],
      record: []
    })
  }

  // 组件卸载
  componentWillUnmount(){
    this.controlWebTimer(false);
  }

  // 定时器控制
  controlWebTimer = (flag) =>{
    // true开启/false关闭
    let viewer = this;
    let timeFlag = this.state.timerFlag;
    if(flag){
      if (!timeFlag){
        timer = setInterval(function() {
          processor.queryTaskStatu(data => {
            // 下面的就是请求来的数据
            var result = data.getSinglePrimaryList();
            console.log(result)
            viewer.setState({
              taskStatu: result
            })
            let timeflag = true;
            for(var i=0;i<result.length;i++){
              if (result[i].status===true){
                timeflag= false;
              }
            }
            if(timeflag){
              // 关闭
              viewer.controlWebTimer(false);
            }
          });
        }, 5000);
        viewer.setState({
          timerFlag:false
        })
      }
    }else {
      clearInterval(timer);
    }
  }

  // 立刻转动
  changeTaskStatuNow =(taskId,status)=>{
    let taskStatuList =  this.state.taskStatu;
    if (taskStatuList.length>0){
      let flag = true;
      for(var i=0;i<taskStatuList.length;i++){
        if(taskStatuList[i].taskId===taskId){
          taskStatuList[i].status=status;
          flag = false;
        }
      }
      if (flag){
        taskStatuList.push({taskId,status});
      }
    }else{
      taskStatuList.push({taskId,status})
    }
    this.setState({
      taskStatu: taskStatuList
    });
  }
  // 清楚复选框
  clearSelectedRows(){
    this.setState({
      selectedRowKeys: [],
      record: []
    })
  }

  // 分页查询
  handleTableChange = (pagination, filters, sorter) => {
    if(pagination!=null) {
      this.setState({
        selectedRowKeys: [],
      })
      processor.handleTableChange(pagination,this.props);
    }
  };

  onSelectChange = (selectedRowKeys,record) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys,record });
  }
  render() {
    const {selectedRowKeys} = this.state;
    const {data} =this.props;
    const {pagination} =this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <div style={{width:'100%',display:'inline-block'}}>
          <DocumentDistributeFormViewer record={this.state.record} selectedRowKeys={selectedRowKeys}
                                        dispatch={this.props.dispatch}
                                        dictType={this.state.dictType}
                                        controlWebTimer={flag =>this.controlWebTimer(flag)}
                                        timeFlag={this.state.timerFlag}
                                        changeTaskStatuNow={(taskId,status)=>this.changeTaskStatuNow(taskId,status)}
                                        clearSelectedRows={()=>this.clearSelectedRows()}
          />
        </div>
        <Table bordered rowKey="taskId" columns={this.columns} rowSelection={rowSelection}  dataSource={data}  onChange={this.handleTableChange} pagination={pagination} />
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    data:store.documentDistributeReducer.data,
    pagination:store.documentDistributeReducer.pagination,
  }
};

export default connect(
  mapStateToProps
)(DocumentDistributeManagerViewer);
