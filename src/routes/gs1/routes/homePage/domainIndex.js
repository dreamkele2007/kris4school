import React, { Component } from 'react';
import { Table,Button,Modal,Progress,notification,Badge } from 'antd';
import IndexProcessor from '../homePage/components/indexProcessor';
import { NavLink as Link } from 'react-router-dom'
import './components/homeui.css';
import ContentMore from '../../components/common/ContentMore.js';
import ContentUl from '../../components/common/ContentUl.js';

const hospitalNum=0;
const totalNum=0;
const updateNum=0;
const newNum=0;
const cancelNum=0;
const prodctManuNum=0;
const sumCancelNum=0;
const dataInterface=0;
const  processor = new IndexProcessor();
const historicalRecord=0;
const columnsProps = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    className:"column-money",
    render: (text, record, index) =>index+1,
    width:45,
  },
   {
    title: '产品名称',
    dataIndex: 'productName',
    key: 'productName',
    className:"column-money",
    sorter: (a, b) => a.productName.length - b.productName.length,
  },{
    title: '产品备注',
    dataIndex: 'productDescription',
    key: 'productDescription',
    className:"column-money",
    sorter: (a, b) => a.productDescription.length - b.productDescription.length,
  }, {
    title: 'GTIN',
    dataIndex: 'gtin',
    key: 'gtin',
    className:"column-money",
    sorter: (a, b) => a.gpcCatagoryCode.length - b.gpcCatagoryCode.length,
  }, {
    title: '产品规格',
    dataIndex: 'spec',
    key: 'spec',
    className:"column-money",
    sorter: (a, b) => a.spec.length - b.spec.length,
  }, {
    title: '商标名称',
    dataIndex: 'brandName',
    key: 'brandName',
    className:"column-money",
    sorter: (a, b) => a.brandName.length - b.brandName.length,
  }, {
    title: '产品注册时间',
    dataIndex: 'createdataTime',
    key: 'createdataTime',
    className:"column-money",
    sorter: (a, b) => a.createdataTime - b.createdataTime,
    render: text =>{
      return new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }
  }, {
    title: '产品更新时间',
    dataIndex: 'changedataTime',
    key: 'changedataTime',
    className:"column-money",
    sorter: (a, b) => a.changedataTime - b.changedataTime,
    render: text =>{
      return new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }
  }];
const columns = [];
const data=[];
const pagination=[];
const uploadFile=0;
const auditNum=0;
const matchPartDetail=0;
const sunDataNUM =0;
const columnsManu = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    className:"column-money",
    render: (text, record, index) =>index+1,
    width:32,
  },
  {
    title: '名称',
    dataIndex: 'gs1ManuName',
    key: 'gs1ManuName',
    className:"column-money",
    sorter: (a, b) => a.gs1ManuName.length - b.gs1ManuName.length,
  }, {
    title: '厂商编码',
    dataIndex: 'manuCode',
    key: 'manuCode',
    className:"column-money",
    sorter: (a, b) => a.manuCode.length - b.manuCode.length,
  }, {
    title: '厂商注册时间',
    dataIndex: 'createDataTime',
    key: 'createDataTime',
    className:"column-money",
    sorter: (a, b) => a.createDataTime - b.createDataTime,
    render: text =>{
      return new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }
  }, {
    title: '厂商更新时间',
    dataIndex: 'changeDateTime',
    key: 'changeDateTime',
    className:"column-money",
    sorter: (a, b) => a.changeDateTime - b.changeDateTime,
    render: text =>{
      return new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }
  }];
const apiconstColumns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    className:"column-money",
    render: (text, record, index) =>index+1,
    width:32,
  }, {
    title: '调用时间',
    dataIndex: 'reqTime',
    key: 'reqTime',
    className:"column-money",
    sorter: (a, b) => a.reqTime - b.reqTime,
    render: text =>{
      return new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }
  }, {
    title: '调用功能',
    dataIndex: 'apiId',
    key: 'apiId',
    className:"column-money",
    sorter: (a, b) => a.apiId - b.apiId,
  }, {
    title: '是否成功',
    dataIndex: 'isSuccess',
    key: 'isSuccess',
    className:"column-money",
    sorter: (a, b) => a.isSuccess - b.isSuccess,
    // render: text =>{
    //   return text==1?'成功':'失败'
    // }
    render: text => {
      if(text=='1') {
        return <span><Badge status="success" />成功</span>
      }else {
        return <span><Badge status="error" />失败</span>
      }
    }
  }];
const goveSubmitColumns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    className:"column-money",
    render: (text, record, index) =>index+1,
    width:32,
  },{
    title: '文件名',
    dataIndex: 'fileUrl',
    key: 'fileUrl',
    className:'column-money',
    sorter: (a, b) => a.fileUrl.length - b.fileUrl.length,
    render: text =>{
      return text==null? null:text.substring(59,text.length);
    }
  },{
    title: '上传日期',
    dataIndex: 'submitTime',
    key: 'submitTime',
    className:'column-money',
    sorter: (a, b) => a.submitTime - b.submitTime,
    render: text =>{
      return text==null||text==''? null:new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }
  }, {
    title: '执行完成日期',
    dataIndex: 'lastMatchTime',
    key: 'lastMatchTime',
    className:'column-money',
    sorter: (a, b) => a.lastMatchTime - b.lastMatchTime,
    render: text =>{
      return text==null||text==''? '未执行完':new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }
  }, {
    title: '稽核完成日期',
    dataIndex: 'checkFinshDate',
    key: 'checkFinshDate',
    className:'column-money',
    sorter: (a, b) => a.checkFinshDate - b.checkFinshDate,
    render: text =>{
      return text==null||text==''? '未稽核完':new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }
  },{
    title: '当前状态',
    dataIndex: 'status',
    key: 'status',
    className:'column-money',
    sorter: (a, b) => a.status - b.status,
    render: (text,record) => <p>{text==0?'未检查':text==1?'检查中':text==2? '已检查':'已稽核'}</p>
  }];
const openNotificationWithIcon = (type, msg) => {
  notification[type]({
    message: '通知消息',
    description: msg,
    placement: 'bottomRight'
  });
};
class Dashboard extends Component {
  state = {
    hospitalNum,
    HistoryMatchId:'',
    HistoryName:'',
    noticeRecord:[],
    name:'',
    matchId:'',
    data,
    pagination,
    updateNum,
    newNum,
    cancelNum,
    totalNum,
    prodctManuNum,
    sumCancelNum,
    historicalRecord,
    visible: false,
    columns,
    dataInterface,
    uploadFile,
    auditNum,
    matchPartDetail,
    sunDataNUM,
    gpcNum:0,
    regionNum:0,
  };
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  onRowClick = (name,matchId)=> {
    if('prodctManuNum'==name){
      if(this.state.prodctManuNum==0){
        openNotificationWithIcon('warning','当前无数据！');
      }else{
        this.state.columns=columnsManu;
        processor.product({total:0,pageSize:10,current:1,defaultCurrent:1},name,matchId,this);
        this.setState({
          visible: true,
          pagination:{pageSize:5}
        });
        this.state.name=name;
        this.state.matchId=matchId;
      }
    }else{
      if('totalNum'==name&&this.state.totalNum==0){
        openNotificationWithIcon('warning','当前无数据！');
        return;
      }else if('newNum'==name&&this.state.newNum==0){
        openNotificationWithIcon('warning','当前无数据！');
        return;
      }else if('updateNum'==name&&this.state.updateNum==0){
        openNotificationWithIcon('warning','当前无数据！');
        return;
      }else if('cancelNum'==name&&this.state.cancelNum==0){
        openNotificationWithIcon('warning','当前无数据！');
        return;
      }else if('sumCancelNum'==name&&this.state.sumCancelNum==0){
        openNotificationWithIcon('warning','当前无数据！');
        return;
      }else{
        this.state.columns=columnsProps;
        processor.product({total:0,pageSize:10,current:1,defaultCurrent:1},name,matchId,this);
        this.setState({
          visible: true,
          pagination:{pageSize:5}
        });
        this.state.name=name;
        this.state.matchId=matchId;
      }
    }
  }
  componentWillMount(){
    processor.queryLeftData(this);
    processor.productDataChange(this);
    processor.queryProdctManuNum(this);
    processor.cancelHistoricalRecord(this);
    processor.dataInterfaceCall(this);
    processor.queryUploadFile(this);
    processor.queryAuditFile(this);
    processor.dataQuality(this);
    processor.queryDataNum(this);
    processor.queryNoticeRecordForm(this);
    processor.region(this);
    processor.gpcCatagory(this);
  }
  handleTableChange = (pagination, filters, sorter) => {
    var HistoryMatchId=this.state.HistoryMatchId;
    var HistoryName=this.state.HistoryName;

    if(this.state.name==''){
      if( this.state.HistoryMatchId!='' && this.state.HistoryName!=''){
        processor.productHistory(pagination,this.state.HistoryName,this.state.HistoryMatchId,this);
      }else{
        processor.historicalRecord(pagination,this);
      }
    }else {
      processor.product(pagination,this.state.name,this.state.matchId,this);
    }

  };
  constructor(props) {
    super(props);
    this.columns = [
      {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      className:"column-money",
      render: (text, record, index) =>index+1,
      width:45,
    }, {
      title: '新增',
      dataIndex: 'newNum',
      key: 'newNum',
      className:"column-money",
      sorter: (a, b) => a.newNum - b.newNum,
      onCellClick:this.onCellClickAdd,
    }, {
      title: '更新',
      dataIndex: 'updateNum',
      key: 'updateNum',
      className:"column-money",
      onCellClick:this.onCellClickUpdate,
      sorter: (a, b) => a.updateNum - b.updateNum,
    }, {
      title: '注销',
      dataIndex: 'cancelNum',
      key: 'cancelNum',
      className:"column-money",
      onCellClick:this.onCellClickCancelNum,
      sorter: (a, b) => a.cancelNum - b.cancelNum,
    },{
      title: '更新时间',
      dataIndex: 'matchDatetime',
      key: 'matchDatetime',
      className:"column-money",
      sorter: (a, b) => a.matchDatetime - b.matchDatetime,
      render: text =>{
        return new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      }
    }
    ];
  }
  time=()=>{
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + "年" + month + "月" + strDate
      + "日";

    return currentdate;
  };
  queryHistorical=()=>{
    if(this.state.historicallNum==0){
      openNotificationWithIcon('warning','当前无数据！');
    }else {
      processor.historicalRecord({total: 0, pageSize: 10, current: 0, defaultCurrent: 0}, this);
      this.state.name = '';
      this.state.columns = this.columns;
      this.setState({
        visible: true,
      });
    }
  };
  onCellClickAdd=(record,index)=>{
    this.state.HistoryMatchId=record.matchId;
    this.state.HistoryName='add';
    processor.productHistory({total:0,pageSize:10,current:1,defaultCurrent:1},'add',record.matchId,this);
    this.state.columns=columnsProps;
  };
  onCellClickUpdate=(record,index)=>{
    this.state.HistoryMatchId=record.matchId;
    this.state.HistoryName='update';
    processor.productHistory({total:0,pageSize:10,current:1,defaultCurrent:1},'update',record.matchId,this);
    this.state.columns=columnsProps;
  };
  onCellClickCancelNum=(record,index)=>{
    this.state.HistoryMatchId=record.matchId;
    this.state.HistoryName='cancel';
    processor.productHistory({total:0,pageSize:10,current:1,defaultCurrent:1},'cancel',record.matchId,this);
    this.state.columns=columnsProps;
  };
  yunsuan=()=>{
   var i=(parseFloat(this.state.matchPartDetail*100)/parseFloat(this.state.sunDataNUM*100));
    if(i.toFixed(2)=='NaN'){
     return 0;
   }else{
      return (Math.round(i * 10000)/100).toFixed(2);
   }
  }
  dataIntegration=(name)=>{
    if(name=='dataInterface'){
      if(this.state.dataInterface==0){
        openNotificationWithIcon('warning','当前无数据！');
      }else{
        processor.product({total:0,pageSize:10,current:1,defaultCurrent:1},name,'-1',this);
        this.setState({
          visible:true
        });
        this.state.name=name;
        this.state.matchId=-1;
        this.state.columns=apiconstColumns;
      }
    }else{
      if(name=='auditNum'&&this.state.auditNum==0){
        openNotificationWithIcon('warning','当前无数据！');
      }else if(name=='uploadFile'&&this.state.uploadFile==0){
        openNotificationWithIcon('warning','当前无数据！');
      }else{
        this.state.columns=goveSubmitColumns;
        processor.product({total:0,pageSize:10,current:1,defaultCurrent:1},name,'-1',this);
        this.setState({
          visible:true
        });
        this.state.name=name;
        this.state.matchId=-1;
      }
    }
  };
  noticeRecord=()=>{

    return (
      <div>
        {
          this.state.noticeRecord.map((item,i)=> {
            if(i<5){
            return <div className=" mb-0">{i+1}   {new Date(parseInt(item.createDatetime ) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")}    更新了数据</div>;
            }
          })
        }
        {this.state.noticeRecord.length==0?
          `暂无通知`: <Link to={`/gs1/result/NoticeRecordManagerViewer`} >查看更多</Link>
        }
      </div>
   )
  };

  render() {
    const   taskMore= {
      key: 'taskMore1',
      title: "通知记录",
      width: "40%",
      contentMore:this.state.noticeRecord
    };
    const   taskMore1= {
      key: 'taskMore1',
      title: "主数据档案",
      width: "40%",
      contentMore: [
        {
          key: 'taskMore1-2',
          name:'产品',
          time:this.time(),
          content: '共有',
          keyword1: '截止到',
          keyword2: this.state.totalNum+'条数据',
        }, {
          key: 'taskMore1-3',
          name:'厂商',
          time:this.time(),
          content: '共有',
          keyword1: '截止到 ',
          keyword2: this.state.prodctManuNum+'条数据',

        }, {
          key: 'taskMore1-4',
          name:'分类',
          time:this.time(),
          content: '共有',
          keyword1: '截止到',
          keyword2: this.state.gpcNum+'类产品',
        },
        {
          key: 'taskMore1-5',
          name:'地区',
          time:this.time(),
          content: '共有',
          keyword1: '截止到',
          keyword2: this.state.regionNum+'个地区',
        }
      ]
    };
    return (
      <div style={{width:'100%',marginLeft:'1.5%',display:'inline-block'}}>
      <div className="animated fadeIn" >
        <div style={{width:'100%',marginTop:10}}>
          <div className="row" >
            <div    style={{width:'100%',marginLeft:'1.2%'}}>
              <div className="row" >
                <div style={{marginLeft:'1.5%',fontSize:14}}>医院标准数据库(各核心数据总条数)</div>
              </div>
              <div className="row" style={{marginTop:'50'}} >
                <div  className="col-sm-6 col-lg-3" style={{marginLeft:'1%', width:'18%'}}>
                  <div  className="card card-inverse ">
                    <div className="card-block"  style={{background:"#FA2A00"}}>
                      <div className="h4 m-0" style={{textAlign:'center',fontSize:20}}>GS1标准产品</div>
                      <div style={{textAlign:'center',fontSize:30}}><a  onClick={()=>{this.onRowClick('totalNum',-1)}}>{this.state.totalNum}</a></div>
                    </div>
                  </div>
                </div>
                <div  className="col-sm-6 col-lg-3" style={{ marginLeft:'1%',width:'18%'}}>
                  <div  className="card card-inverse ">
                    <div className="card-block" style={{background:"#FFB400"}}>
                      <div className="h4 m-0" style={{textAlign:'center',fontSize:20}}>GS1标准厂商</div>
                      <div style={{textAlign:'center',fontSize:30}}><a onClick={()=>{this.onRowClick('prodctManuNum',-1)}}>{this.state.prodctManuNum}</a></div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3" style={{marginLeft:'1%',width:'18%'}}>
                  <div style={{marginTop:'-73',fontSize:14,float:'right'}}>数据集成(截止{this.time()})</div>
                  <div className="card card-inverse " style={{background:"#1ABC9C"}}>
                    <div className="card-block">
                      <div className="h4 m-0" style={{textAlign:'center',fontSize:20}}>上传文件总数</div>
                      <div style={{textAlign:'center',fontSize:30}}><a onClick={()=>{this.dataIntegration('uploadFile')}}>{this.state.uploadFile}</a></div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3" style={{marginLeft:'1%',width:'18%'}}>
                  <div className="card card-inverse " style={{background:"#4C87ED"}}>
                    <div className="card-block">
                      <div className="h4 m-0" style={{textAlign:'center',fontSize:17.5}}>待稽核文件总数</div>
                      <div style={{textAlign:'center',fontSize:30}}><a onClick={()=>{this.dataIntegration('auditNum')}}>{this.state.auditNum}</a></div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3" style={{marginLeft:'1%',width:'18%'}}>
                  <div className="card card-inverse" style={{background:"#22A7F0"}}>
                    <div className="card-block">
                      <div className="h4 m-0" style={{textAlign:'center',fontSize:20}}>接口调用总数</div>
                      <div style={{textAlign:'center',fontSize:30}}><a onClick={()=>{this.dataIntegration('dataInterface')}}>{this.state.dataInterface}</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{width:'100%',marginTop:10}}>
          <div className="row" >
            <div    style={{width:'100%',marginLeft:'1.2%'}}>
              <p style={{marginTop:5,marginLeft:5,fontSize:14}}>数据变化(截止{this.time()})</p>
              <div className="row" style={{marginTop:'50'}} >
                <div  className="col-sm-6 col-lg-3" style={{marginLeft:'1%', width:'18%'}}>
                  <div  className="card card-inverse " style={{background:"#FA2A00"}}>
                    <div className="card-block">
                      <div className="h4 m-0" style={{textAlign:'center',fontSize:20}}>最近新增产品</div>
                      <div style={{textAlign:'center',fontSize:30}}><a onClick={()=>{this.onRowClick('newNum',-1)}}>{this.state.newNum}</a></div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3" style={{marginLeft:'1%',width:'18%'}}>
                  <div className="card card-inverse " style={{background:"#FFB400"}}>
                    <div className="card-block">
                      <div className="h4 m-0" style={{textAlign:'center',fontSize:20}}>最近更新产品</div>
                      <div style={{textAlign:'center',fontSize:30}}><a onClick={()=>{this.onRowClick('updateNum',-1)}}>{this.state.updateNum}</a></div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3" style={{marginLeft:'1%',width:'18%'}}>
                  <div className="card card-inverse " style={{background:"#1ABC9C"}}>
                    <div className="card-block">
                      <div className="h4 m-0" style={{textAlign:'center',fontSize:20}} >最近注销产品</div>
                      <div style={{textAlign:'center',fontSize:30}}><a onClick={()=>{this.onRowClick('cancelNum',-1)}}>{this.state.cancelNum}</a></div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3" style={{marginLeft:'1%',width:'18%'}}>
                  <div className="card card-inverse " style={{background:"#4C87ED"}}>
                    <div className="card-block">
                      <div className="h4 m-0" style={{textAlign:'center',fontSize:20}} >累计注销</div>
                      <div style={{textAlign:'center',fontSize:30}}><a onClick={()=>{this.onRowClick('sumCancelNum',-1)}}>{this.state.sumCancelNum}</a></div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3" style={{marginLeft:'1%',width:'18%'}}>
                  <div className="card card-inverse" style={{background:"#22A7F0"}}>
                    <div className="card-block">
                      <div className="h4 m-0" style={{textAlign:'center',fontSize:20}} >历史更新</div>
                      <div style={{textAlign:'center',fontSize:30}}><a onClick={()=>{this.queryHistorical()}}>{this.state.historicallNum}</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="row" style={{width:'100%',marginTop:10}}>
          <div  style={{width:'25%',marginLeft:5}}>
            <p style={{marginTop:20,marginLeft:10,fontSize:14}}>数据质量(匹配度90%+的数据/全数据量)</p>
            <div className="row">
              <div style={{marginTop:'6%',width:200,marginLeft:20}} className="col-sm-6 col-lg-3">
                <div className="card">
                  <div className="card-block" >
                    <div className="h4 m-0" style={{textAlign:'center'}}>产品</div>
                    <div style={{marginTop:20,marginLeft:20}} > <Progress width={80}  type="circle" percent={this.yunsuan()} /></div>
                    <div style={{textAlign:'center',marginTop:5}} className="text-muted" >{this.state.matchPartDetail}/{this.state.sunDataNUM}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{width:'74%',marginTop:10}}>
            <div className="row" >
              <div  style={{marginTop:-10,width:'40%'}}>
                <div className="row">
                  <div style={{width:500}} className="col-sm-6 col-lg-3">
                    <div  className="card-block">
                      <ContentMore contents={taskMore1}/>
                    </div>
                  </div>
                </div>
              </div>
              <div  style={{marginLeft:80,marginTop:-10,width:'40%'}}>
                <div className="row">
                  <div style={{width:500}} className="col-sm-6 col-lg-3">
                    <div  className="card-block">
                      <ContentUl contents={taskMore}/></div> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          maskClosable={false}
          width={1300}
          title="详情信息"
          footer={[
            <Button key="submit" type="primary" size="large" onClick={this.hideModal}>
              关闭
            </Button>
          ]}
        >
          <Table bordered  columns={this.state.columns}  onChange={this.handleTableChange}  pagination={this.state.pagination} dataSource={this.state.data} />
        </Modal>
      </div>
    )
  }
}

export default Dashboard;
