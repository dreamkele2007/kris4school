import React, { Component } from 'react';
import {Table,Button,Modal,notification } from 'antd';
import IndexProcessor from './components/indexProcessor';
import './components/homeui.css';
import ReactEcharts from'./components/ReactECharts/index';
import ContentMore from '../../components/common/ContentMore.js';

const totalNum=0;
const updateNum=0;
const newNum=0;
const cancelNum=0;
const prodctManuNum=0;
const sumCancelNum=0;
const historicallNum=0;
const historicalRecord=0;
const hospitalNum=0;
const eChartsData=[];
const  processor = new IndexProcessor();
const columnsProps = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    className:"column-money",
    render: (text, record, index) =>index+1,
    width:32,
  },
   {
    title: '产品名称',
    dataIndex: 'productName',
    key: 'productName',
    className:"column-money",
    sorter: (a, b) => a.productName.length - b.productName.length,
  }, {
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
const eCharProductData=[];
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
const hospitalColumns = [
  {
  title: '序号',
  dataIndex: 'key',
  key: 'key',
  className:"column-money",
  render: (text, record, index) =>index+1,
  width:32,
},{
  title: '医院名称',
  dataIndex: 'hospitalName',
  key: 'hospitalName',
    className:"column-money",
  sorter: (a, b) => a.hospitalName.length - b.hospitalName.length,
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
  sorter: (a, b) => a.contacts - b.contacts,
}, {
  title: '城市',
  dataIndex: 'city',
  key: 'city',
    className:"column-money",
  sorter: (a, b) => a.city - b.city,
}, {
  title: '地址',
  dataIndex: 'address',
  key: 'address',
    className:"column-money",
  sorter: (a, b) => a.address - b.address,
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
},{
  title: '是否停用',
  dataIndex: 'isStop',
  key: 'isStop',
    className:"column-money",
  sorter: (a, b) => a.isStop - b.isStop,
  // render: text => <p>{text==0?'停用':'启用'}</p>,
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
    HistoryMatchId:'',
    regionNum:0,
    HistoryName:'',
    name:'',
    matchId:'',
    historicallNum,
    data,
    pagination,
    updateNum,
    newNum,
    cancelNum,
    totalNum,
    prodctManuNum,
    sumCancelNum,
    hospitalNum,
    visible: false,
    columns,
    dataSource:[],
    historicalRecord,
    eChartsData,
    eCharProductData,
    gpcNum:0
  };
  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  onRowClick = (name,matchId)=> {
    if('prodctManuNum'===name){
      if(this.state.prodctManuNum==0){
        openNotificationWithIcon('warning','当前无数据！');
      }else{
        // this.state.columns=columnsManu;
        processor.product({total:0,pageSize:10,current:1,defaultCurrent:1},name,matchId,this);
        this.setState({
          visible: true,
          columns:columnsManu,
          name:name,
          matchId:matchId
        });
        // this.state.name=name;
        // this.state.matchId=matchId;
      }
    }else{
      if('totalNum'===name&&this.state.totalNum==0){
        openNotificationWithIcon('warning','当前无数据！');
        return;
      }else if('newNum'===name&&this.state.newNum==0){
        openNotificationWithIcon('warning','当前无数据！');
        return;
      }else if('updateNum'===name&&this.state.updateNum==0){
        openNotificationWithIcon('warning','当前无数据！');
        return;
      }else if('cancelNum'===name&&this.state.cancelNum==0){
        openNotificationWithIcon('warning','当前无数据！');
        return;
      }else if('sumCancelNum'===name&&this.state.sumCancelNum==0){
        openNotificationWithIcon('warning','当前无数据！');
        return;
      }else{
        this.setState({
          columns: columnsProps,
        });
        // this.state.columns=columnsProps;
        processor.product({total:0,pageSize:10,current:1,defaultCurrent:1},name,matchId,this);
        this.setState({
          visible: true,
          name:name,
          matchId:matchId
        });
        // this.state.name=name;
        // this.state.matchId=matchId;
      }
    }
  };
  componentWillMount(){
    processor.queryLeftData(this);
    processor.productDataChange(this);
    processor.queryProdctManuNum(this);
    processor.queryHospitalNum(this);
    processor.cancelHistoricalRecord(this);
    processor.eChartsData(this);
    processor.eCharProductNum(this);
    processor.region(this);
    processor.gpcCatagory(this);
  }
  onCellClickAdd=(record,index)=>{
    this.setState({
      HistoryMatchId: record.matchId,
      HistoryName:'add',
    });
    // this.state.HistoryMatchId=record.matchId;
    // this.state.HistoryName='add';
    processor.productHistory({total:0,pageSize:10,current:1,defaultCurrent:1},'add',record.matchId,this);
    // this.state.columns=columnsProps;
    this.setState({
      columns: columnsProps,
    });
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
  constructor(props) {
    super(props);
    this.columns = [{
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
      // render: (text,record) => <Link to={`/gs1/product?name=add&id=`+record.matchId}>{text}</Link>,
    }, {
      title: '更新',
      dataIndex: 'updateNum',
      key: 'updateNum',
      className:"column-money",
      onCellClick:this.onCellClickUpdate,
      sorter: (a, b) => a.updateNum - b.updateNum,
      // render: (text,record) =><Link to={`/gs1/product?name=updata&id=`+record.matchId} >{text}</Link>,
    }, {
      title: '注销',
      dataIndex: 'cancelNum',
      key: 'cancelNum',
      className:"column-money",
      onCellClick:this.onCellClickCancelNum,
      sorter: (a, b) => a.cancelNum - b.cancelNum,
      // render: (text,record) =><Link to={`/gs1/product?name=cancel&id=`+record.matchId} >{text}</Link>,
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
  handleTableChange = (pagination, filters, sorter) => {
    if(this.state.name==''){

      if( this.state.HistoryMatchId!='' && this.state.HistoryName!=''){
        processor.productHistory(pagination,this.state.HistoryName,this.state.HistoryMatchId,this);
      }else{
        processor.historicalRecord(pagination,this);
      }
    }else{
      processor.product(pagination,this.state.name,this.state.matchId,this);
    }
  };
  time=()=>{
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + " ";
    return currentdate;
  };
  echardataName=()=>{
    var arr=[];
    for (var i =0;i<this.state.eChartsData.length;i++) {
      arr.push(this.state.eChartsData[i].hospitalName)
    }
    return arr;
  };
  echardataTotal=()=>{
    var arr=[];
    for (var i =0;i<this.state.eChartsData.length;i++) {
      arr.push(this.state.eChartsData[i].upNum)
    }
    return arr;
  };
  echardataAuditNum=()=>{
    var arr=[];
    for (var i =0;i<this.state.eChartsData.length;i++) {
      arr.push(this.state.eChartsData[i].auditNum)
    }
    return arr;
  };
  queryHistorical=()=>{
    if(this.state.historicallNum==0){
      openNotificationWithIcon('warning','当前无数据！');
    }else{
      processor.historicalRecord({total:0,pageSize:10,current:1,defaultCurrent:1},this);
      // this.state.columns=this.columns;
      // this.state.name='';
      this.setState({
        visible: true,
        name:'',
        columns:this.columns
      });
    }

  };
  echarProductDataName=()=>{
    var arr=[];
    for (var i =0;i<this.state.eCharProductData.length;i++) {
      arr.push(this.state.eCharProductData[i].hospitalName)
    }
    return arr;
  };
  eCharProductDataTote=()=>{
    var arr=[];
    for (var i =0;i<this.state.eCharProductData.length;i++) {
      arr.push(this.state.eCharProductData[i].productTote)
    }
    return arr;
  };
  eCharAuditDataTote=()=>{
    var arr=[];
    for (var i =0;i<this.state.eCharProductData.length;i++) {
      arr.push(this.state.eCharProductData[i].auditTote)
    }
    return arr;
  };
  hospital=()=>{
    if(this.state.hospitalNum==0){
      openNotificationWithIcon('warning','当前无数据！');
    }else{
      processor.product({total:0,pageSize:10,current:1,defaultCurrent:1},'hospital','-1',this);
      // this.state.columns=hospitalColumns;
      // this.state.name='hospital';
      // this.state.matchId='-1';
      this.setState({
        visible:true,
        columns:hospitalColumns,
        name:'hospital',
        matchId:'-1'
      });
    }
  };
   render() {
    const  echarDataName=this.echardataName();
    const option = {
      title: {
        text: '各医院\n上传文件总数/稽核完成数',
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['上传文件总数','稽核文件总数']
      },
      toolbox: {
        show : true,
        feature : {
          mark : {show: true},
          dataView : {show: true, readOnly: false},
          magicType : {show: true, type: ['line', 'bar']},
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      calculable : true,
      xAxis : [
        {
          type : 'category',
          data : echarDataName
        }
      ],
      yAxis : [
        {
          minInterval : 1,
          type : 'value'
        }
      ],
      series : [
        {
          name:'上传文件总数',
          type:'bar',
          data:this.echardataTotal(),
        },
        {
          name:'稽核文件总数',
          type:'bar',
          data:this.echardataAuditNum(),
        }
      ]
    };
     const option1 = {
      title: {
        text: '各医院\n稽核后的厂商/产品总数',
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['厂商','产品']
      },
      toolbox: {
        show : true,
        feature : {
          mark : {show: true},
          dataView : {show: true, readOnly: false},
          magicType : {show: true, type: ['line', 'bar']},
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      calculable : true,
      xAxis : [
        {
          type : 'category',
          data : this.echarProductDataName()
        }
      ],
      yAxis : [
        {
          minInterval : 1,
          type : 'value'
        }
      ],
      series : [
        {
          name:'厂商',
          type:'bar',
          data:this.eCharAuditDataTote(),
        },
        {
          name:'产品',
          type:'bar',
          data:this.eCharProductDataTote()
        }
      ]
    };
     const   taskMore= {
       key: 'taskMore1',
       title: "主数据档案",
       width: "40%",
       contentMore: [
         {
           key: 'taskMore1-1',
           name:'医院',
           time:this.time(),
           content: '共有',
           keyword1: '截止到',
           keyword2: this.state.hospitalNum+'条数据',
         }, {
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
      <div>
      <div className="animated fadeIn">
        <div>
          <div style={{width:'100%',marginTop:10}}>
            <div className="row" >
              <div  style={{width:'48%',marginLeft:"1%"}} >
                <p style={{marginTop:5,marginLeft:5,fontSize:14}}>医院标准数据库(各核心数据总条数)</p>
                <div className="row" style={{marginTop:30,marginLeft:15}}>
                  <div  className="col-sm-6 col-lg-3" style={{ width:'41%'}}>
                    <div  className="card card-inverse ">
                      <div className="card-block"  style={{background:"#FA2A00"}}>
                        <div className="h4 m-0" style={{textAlign:'center',fontSize:20}}>GS1标准产品</div>
                        <div style={{textAlign:'center',fontSize:30}}><a  onClick={()=>{this.onRowClick('totalNum',-1)}}>{this.state.totalNum}</a></div>
                      </div>
                    </div>
                  </div>
                  <div  className="col-sm-6 col-lg-3" style={{ width:'41%'}}>
                    <div  className="card card-inverse">
                      <div className="card-block" style={{background:"#FFB400"}}>
                        <div className="h4 m-0" style={{textAlign:'center',fontSize:20}}>GS1标准厂商</div>
                        <div style={{textAlign:'center',fontSize:30}}><a onClick={()=>{this.onRowClick('prodctManuNum',-1)}}>{this.state.prodctManuNum}</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{width:'50%'}}>
                <div className="row " style={{marginTop:-20,width:'98%'}}>
                  <div className="col-xl-6 "  style={{width:'98%'}}>
                    <div className="card-block">
                      <img src={require('assets/images/ui/14.png')} style={{width:"110%"}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div style={{width:'100%',marginTop:10}}>
          <div className="row" >
            <div    style={{width:'60%',marginLeft:'1.2%'}}>
              <p style={{marginTop:5,marginLeft:5,fontSize:14}}>数据变化(截止{this.time()})</p>
              <div className="row" style={{marginTop:20,marginLeft:15}} >
                <div  className="col-sm-6 col-lg-3" style={{ width:'33%'}}>
                  <div  className="card card-inverse ">
                    <div className="card-block" style={{background:"#1ABC9C"}}>
                      <div className="h4 m-0" style={{textAlign:'center',fontSize:20}}>最近新增产品</div>
                      <div style={{textAlign:'center',fontSize:30}}><a onClick={()=>{this.onRowClick('newNum',-1)}}>{this.state.newNum}</a></div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3" style={{width:'33%'}}>
                  <div className="card card-inverse ">
                    <div className="card-block" style={{background:"#4C87ED"}}>
                      <div className="h4 m-0" style={{textAlign:'center',fontSize:20}}>最近更新产品</div>
                      <div style={{textAlign:'center',fontSize:30}}><a onClick={()=>{this.onRowClick('updateNum',-1)}}>{this.state.updateNum}</a></div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3" style={{width:'33%'}}>
                  <div className="card card-inverse">
                    <div className="card-block" style={{background:"#22A7F0"}}>
                      <div className="h4 m-0" style={{textAlign:'center',fontSize:20}} >最近注销产品</div>
                      <div style={{textAlign:'center',fontSize:30}}><a onClick={()=>{this.onRowClick('cancelNum',-1)}}>{this.state.cancelNum}</a></div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3" style={{width:'33%'}}>
                  <div className="card card-inverse ">
                    <div className="card-block" style={{background:"#1ABC9C"}}>
                      <div className="h4 m-0" style={{textAlign:'center',fontSize:20}} >累计注销</div>
                      <div style={{textAlign:'center',fontSize:30}}><a onClick={()=>{this.onRowClick('sumCancelNum',-1)}}>{this.state.sumCancelNum}</a></div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3" style={{width:'33%'}}>
                  <div className="card card-inverse ">
                    <div className="card-block" style={{background:"#4C87ED"}}>
                      <div className="h4 m-0" style={{textAlign:'center',fontSize:20}} >历史更新</div>
                      <div style={{textAlign:'center',fontSize:30}}><a onClick={()=>{this.queryHistorical()}}>{this.state.historicallNum}</a></div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-lg-3" style={{width:'33%'}}>
                  <div className="card card-inverse ">
                    <div className="card-block" style={{background:"#22A7F0"}}>
                      <div className="h4 m-0" style={{textAlign:'center',fontSize:20}} >对接医院总数</div>
                      <div style={{textAlign:'center',fontSize:30}} ><a onClick={()=>{this.hospital()}}>{this.state.hospitalNum}</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div  style={{marginTop:-10,width:'30%'}}>
              <div className="row">
                <div style={{width:500}} className="col-sm-6 col-lg-3">
                    <div  className="card-block">
                      <ContentMore contents={taskMore}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div style={{width:'100%',marginTop:10}}>
            <div className="row" >

              <div style={{marginLeft:"2%",width:'49%'}}  >
                    <div className="row " style={{marginTop:10,width:'105%'}}>
                      <div className="col-xl-6 "  style={{width:'98%'}}>
                          <div className="card-block">
                            <ReactEcharts style={{height: '300' ,width:'100%'}} option={option}  showLoading={false} />
                          </div>
                      </div>
                    </div>
                 </div>
                  <div style={{width:'49%'}}>
                    <div className="row " style={{marginTop:10,width:'105%'}}>
                      <div className="col-xl-6 "  style={{width:'98%'}}>
                          <div className="card-block">
                            <ReactEcharts style={{height: '300px' ,width:'90%'}} option={option1}  showLoading={false} />
                          </div>
                      </div>
                    </div>
              </div>
            </div>
          </div>

        </div>
      </div>

        <Modal
          title="详情信息"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          maskClosable={false}
          width={1200}
          footer={[
            <Button key="submit" type="primary" size="large" onClick={this.hideModal}>
              关闭
            </Button>
          ]}
        >
          <Table  bordered columns={this.state.columns}  onChange={this.handleTableChange}  pagination={this.state.pagination} dataSource={this.state.data} />
        </Modal>
      </div>
    )
  }
}

export default Dashboard;
