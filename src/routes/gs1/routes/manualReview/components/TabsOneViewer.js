/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import {Table,Button,Form,Select,Input,notification} from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import { NavLink as Link } from 'react-router-dom'
import SearchFromViewer from './SearchFromViewer';
import ManualReviewManagerProcessor from './ManualReviewManagerProcessor';
import SearchFromProcessor from './SearchFromProcessor';
import  ManualForm from './ManualForm';
const FormItem = Form.Item;
const Option = Select.Option;
const  data=[];
const dataSource =[];
const openNotificationWithIcon = (type, msg) => {
  notification[type]({
    duration:1,
    message: '通知消息',
    description: msg,
    placement: 'bottomRight'
  });
};
const processor=new ManualReviewManagerProcessor();
const pro=new SearchFromProcessor();
class TabsOneViewer extends React.Component {
  state = {
    arr:[],
    pagination:{pageSize:5},
    page:{pageSize:10},
    dataSource,
    data,
    visible: false,
    domainValue:[],
    nullValue:[],
    selectedRowKeys:[],
    selectedRows:[],
    submitId:'',
    domainDataId:'',
    display:'none',
    modelData:data,
    sortedInfo: null,
    name:'',
    status:'searchArithmetic',
    searchArithmeticColor:'#FFFFFF',
    manualMatchColor:'#FFFFFF',
    dis:'none',
    menuName:[],
    notAuditedNumArr:this.props.notAuditedNumArr,
    haveAuditNumArr:this.props.haveAuditNumArr,
    divStatus:['none'],
    manufacturingPlantName:'',
    paginationValue:{total:0,pageSize:10,current:1,defaultCurrent:1},
  };
  constructor(props) {
    super(props);
    //租户上传表格的column
    this.columns = [
      {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      className:"column-money",
      render: (text, record, index) =>index+1,
      width:32,
      fixed: 'left',
    },
      {
      title: '是否修改',
      textAlign:'center',
      dataIndex: 'isEdit',
      key: 'isEdit',
      sorter: (a, b) => a.isEdit - b.isEdit,
      render: (text,record) =>text==null||text==='0'? '' : <center><strong style={{color:'#ff1515',fontSize:10,textAlign:'center'}}>*</strong></center>,
      className:'column-money',
      width:100,
    },
      {
      title: '是否已稽核',
      textAlign:'center',
      dataIndex: 'isChecked',
      key: 'isChecked',
      sorter: (a, b) => a.isChecked - b.isChecked,
      render: (text,record) =>text===null||text==='0'? <center><strong style={{color:'#000000',fontSize:10,textAlign:'center'}}>×</strong></center> : <center><strong style={{color:'#000000',fontSize:10,textAlign:'center'}}>√</strong></center>,
      className:'column-money',
      width:110,
    },
      {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      className:'column-money',
      sorter: (a, b) => a.productName.length - b.productName.length,
      width:320,
    },{
        title: '产品品牌',
        dataIndex: 'brandName',
        key: 'brandName',
        className:'column-money',
        sorter: (a, b) => a.brandName.length - b.brandName.length,
        width:120
      },{
      title: '产品规格',
      dataIndex: 'spec',
      key: 'spec',
      className:'column-money',
      margin: 'auto',
      sorter: (a, b) => a.spec.length - b.spec.length,
      width:220,
    },{
      title: '生产厂商',
      dataIndex: 'manufacturingPlantName',
      key: 'manufacturingPlantName',
      className:'column-money',
      margin: 'auto',
      sorter: (a, b) => a.manufacturingPlantName.length - b.manufacturingPlantName.length,
      width:270,
    },
    //   {
    //   title: '企业地址',
    //   dataIndex: 'manufacturingPlantAddress',
    //   key: 'manufacturingPlantAddress',
    //   className:'column-money',
    //   margin: 'auto',
    //   sorter: (a, b) => a.manufacturingPlantAddress.length - b.manufacturingPlantAddress.length,
    // },
      {
        title: '院方编码',
        dataIndex: 'hospitalCode',
        key: 'hospitalCode',
        className:'column-money',
        sorter: (a, b) => a.hospitalCode - b.hospitalCode,
        width:130,
      },{
      title: 'GTIN码',
      dataIndex: 'gs1Gtin',
      key: 'gs1Gtin',
      className:'column-money',
      sorter: (a, b) => a.gs1Gtin - b.gs1Gtin,
      width:130,
    },{
      title: '匹配个数',
      dataIndex: 'countProduct',
      key: 'countProduct',
      className:'column-money',
      sorter: (a, b) => a.countProduct - b.countProduct,
      width:80,
      fixed: 'right',
      // onCellClick:this.onCellClick,
      render: (text,record) =>record.isChecked==='1'? null:text,
    }];
    //标准数据表格的column
    this.columns1 = [
      {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      className:"column-money",
      render: (text, record, index) =>index+1,
      width:32,
      fixed: 'left',
    },{
      title: '匹配度',
      dataIndex: 'matchDegree',
      key: 'matchDegree',
      className:'column-money',
      sorter: (a, b) => a.matchingDegree - b.matchingDegree,
      render: (text,record) =>text==null? "":(Math.round(text* 10000)/100)+"%",
      width:80,
      fixed: 'left',
    },{
      title: '生产厂商',
      dataIndex: 'manufacturingPlantName',
      key: 'manufacturingPlantName',
      className:'column-money',
      sorter: (a, b) => a.manufacturingPlantName==null? '' : a.manufacturingPlantName.length -
      b.manufacturingPlantName==null?'': b.manufacturingPlantName.length,
      render: (text,record) =>"天津市东南恒生医用科技有限公司",
      width:260,
    },{
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      className:'column-money',
      sorter: (a, b) => a.productName.length - b.productName.length,
      width:320,
    },{
        title: '产品品牌',
        dataIndex: 'brandName',
        key: 'brandName',
        className:'column-money',
        sorter: (a, b) => a.brandName.length - b.brandName.length,
        width:120
      },{
      title: '产品规格',
      dataIndex: 'spec',
      key: 'spec',
      className:'column-money',
      sorter: (a, b) => a.spec.length - b.spec.length,
      width:220,
    },{
      title: 'GTIN码',
      dataIndex: 'gtin',
      key: 'gtin',
      className:'column-money',
      sorter: (a, b) => a.gtin - b.gtin,
      width:130,
    },{
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      className:'column-money',
      width:140,
      fixed: 'right',
      render: (text,record) =>{
        return (
          <div>
            <ManualForm selectedRows={this.state.selectedRows}
                        dis={this.state.dis} name={this.state.name} record={record}
                        selectedRowKeys={this.state.selectedRowKeys} modelData={this.state.modelData}
                        submitId={this.state.submitId} dispatch={this.props.dispatch}
                        domainValue={this.state.domainValue} notAuditedNumArr={this.props.notAuditedNumArr}
                        haveAuditNumArr={this.props.haveAuditNumArr} divStatus={this.state.divStatus}
                        paginationValue={this.state.paginationValue} condition={this.props.condition}
            />
          </div>
        )
      },
    }];
    this.columns2 = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        className:"column-money",
        render: (text, record, index) =>index+1,
        width:32,
        fixed:'left',
      },{
        title: '生产厂商',
        dataIndex: 'manufacturingPlantName',
        key: 'manufacturingPlantName',
        className:'column-money',
        sorter: (a, b) => a.manufacturingPlantName==null? '' : a.manufacturingPlantName.length -
        b.manufacturingPlantName==null?'': b.manufacturingPlantName.length,
        render: (text,record) =>"天津市东南恒生医用科技有限公司",
        width:260,
      },{
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        className:'column-money',
        sorter: (a, b) => a.productName.length - b.productName.length,
        width:320,
      },{
        title: '产品品牌',
        dataIndex: 'brandName',
        key: 'brandName',
        className:'column-money',
        sorter: (a, b) => a.brandName.length - b.brandName.length,
        width:120
      },{
        title: '产品规格',
        dataIndex: 'spec',
        key: 'spec',
        className:'column-money',
        sorter: (a, b) => a.spec.length - b.spec.length,
        width:220,
      },{
        title: 'GTIN码',
        dataIndex: 'gtin',
        key: 'gtin',
        className:'column-money',
        sorter: (a, b) => a.gtin - b.gtin,
        width:130,
      },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        className:'column-money',
        width:140,
        fixed:'right',
        render: (text,record) =>{
          return (
            <div>
              <ManualForm selectedRows={this.state.selectedRows}
                          dis={this.state.dis} name={this.state.name} record={record}
                          selectedRowKeys={this.state.selectedRowKeys} modelData={this.state.modelData}
                          submitId={this.state.submitId} dispatch={this.props.dispatch}
                          domainValue={this.state.domainValue} notAuditedNumArr={this.props.notAuditedNumArr}
                          haveAuditNumArr={this.props.haveAuditNumArr}  notAuditedNum={this.state.notAuditedNum}
                          haveAuditNum={this.state.haveAuditNum}   divStatus={this.state.divStatus}
                          paginationValue={this.state.paginationValue} condition={this.props.condition}
              />
            </div>
          )
        },
      }];
  }
  //页面加载
  componentWillMount() {
    processor.loadMagData({total:0,pageSize:10,current:1,defaultCurrent:1},this.props,this.props.submitId,"notAudited");
    this.setState({
      submitId:this.props.submitId,
      dataSource:[],
      name:'notAudited',
      notAuditedNum:this.props.notAuditedNum,
      haveAuditNum:this.props.haveAuditNum,
    });
    //获的标准库厂商下拉
    processor.getMatchMenuNameList(data => {
      //下面的就是请求来的数据
      var result = data.getSinglePrimaryList();
      this.setState({
        menuName: result,
      })
    });
    //获得未稽核
    processor.getCount(this.props.submitId,"notAudited",data => {
      var dc = data;
      const arr=[]
      var count=dc.parameters.result;
      arr.unshift(count);
      this.setState({
        notAuditedNum:arr,
      });
    });
    //获得已稽核
    processor.getCount(this.props.submitId,"haveAudit",data => {
      var dc = data;
      const arr=[]
      var count=dc.parameters.result;
      arr.unshift(count);
      this.setState({
        haveAuditNum:arr,
      });
    });
    var notAuditedNumVal=this.props.notAuditedNumArr;
    var haveAuditNumVal=this.props.haveAuditNumArr;
    notAuditedNumVal.splice(0,notAuditedNumVal.length);
    haveAuditNumVal.splice(0,haveAuditNumVal.length);
    var notAudited= this.state.notAuditedNum;
    var haveAudit=  this.state.haveAuditNum;
    notAuditedNumVal.unshift(notAudited);
    haveAuditNumVal.unshift(haveAudit);
    this.setState({
      notAuditedNumArr:notAuditedNumVal,
      haveAuditNumArr:notAuditedNumVal,
    })
  }
  //组件变更
  componentWillReceiveProps(newProps) {
    if(newProps!=null&&newProps.condition!=null) {
      processor.formChange(null,newProps.condition,this);
    }
  };
  //渲染标准厂商下拉
  drawMenu() {
    const children = [];
    for (let i = 0; i < this.state.menuName.length; i++) {
      var obj = this.state.menuName[i];
      children.push(<Option key={obj.gs1ManuName}>{obj.gs1ManuName}</Option>);
    }
    return children;
  }
  //下拉框选中
  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.setState({
      selectedRowKeys:selectedRowKeys,
      selectedRows:selectedRows,
      dis:'none',
      status:'searchArithmetic',
      divStatus:['none']
    });
    // this.state.status='searchArithmetic';
    // this.state.divStatus=['none']
    this.props.form.setFieldsValue({
      manufacturingPlantName:'',
      productName:'',
      spec:'',
      gtin:'',
    });
  }
  //判断输入的是否全是空格
  isNull=( str )=>{
    if ( str === "" ) return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
  }
  //上部分表格分页
  loadData =(pagination, filters, sorter) =>{
    var name=this.state.name;
    if(pagination!==null && this.props.submitId !=='') {
      processor.tableLoadData(this.props,pagination,this.props.submitId,name);
      this.setState({
        selectedRowKeys:[],
        selectedRows:[],
        dis:'none',
        paginationValue:pagination,
        divStatus:['none'],
      });
      // this.state.divStatus=['none']
    }
  }
  //下部分表格分页
  getManualMatchData =(page, filters, sorter) =>{
    if(this.state.status==='searchArithmetic'){
      if( this.state.selectedRows[0]==null){
        openNotificationWithIcon('warning', '请重新选择数据！');
        return;
      }else {
        processor.getMatchData(page,this.state.selectedRows[0].domainDataId, this)
      }
    }else{
      if(this.state.arr.length>0){
        processor.getManualMatchData(this.state.arr[0].manufacturingPlantName,this.state.arr[0].productName,this.state.arr[0].spec,this.state.arr[0].gtin,page,this);
      }else{
        processor.getManualMatchData(null,null,null,null,page,this);
      }
    }
  }
  //点击
  onCellClick = (record, index)=> {
    var manufacturingPlantName=record.manufacturingPlantName;
    this.props.form.setFieldsValue({
      manufacturingPlantName:manufacturingPlantName,
      productName:'',
      spec:'',
      gtin:'',
    });
    var domainDataId=record.domainDataId;
    if(this.state.selectedRowKeys[0]!== index){
      this.setState({
        selectedRowKeys: [],
        selectedRows:[]
      });
      this.state.selectedRowKeys.push(index);
      this.state.selectedRows.push(record);
    }
    this.setState({
      manufacturingPlantName:manufacturingPlantName,
      searchArithmeticColor:'#FFFFFF',
      manualMatchColor:'#FFFFFF',
      dis:'',
    })
    this.state.divStatus[0]=''
    this.state.domainValue=this.state.selectedRows[0];
    var selectLength=this.state.selectedRowKeys.length
    if(selectLength===1){
      //如果匹配个数是0就直接查询标准数据
      if(record.countProduct===0){
        this.state.status='manualMatch';
        processor.getManualMatchData(null,null,null,null,null,this);
        this.setState({
          visible: false,
          display:'',
          manualMatchColor:'#1ABC9C',
        });
      }else{
        //如果匹配个数不为空根据一条走算法查询数据
        this.state.status='searchArithmetic';
        processor.getMatchData({total:0,pageSize:10,current:1,defaultCurrent:1},domainDataId,this)
        this.setState({
          visible: false,
          display:'none',
          searchArithmeticColor:'#1ABC9C',
        });
      }
    }else{
      openNotificationWithIcon('warning', '请选择一条进行修改');
      this.state.divStatus[0]='none'
    }
  };
  //算法匹配
  searchArithmetic=()=>{
    let domainDataId=this.state.domainValue.domainDataId;
    this.state.status='searchArithmetic';
    this.setState({
      display:'none',
      searchArithmeticColor:'#1ABC9C',
      manualMatchColor:'#FFF5FD',
    });
    processor.getMatchData({total:0,pageSize:10,current:1,defaultCurrent:1},domainDataId,this)
    this.setState({
      visible: false,
      domainDataId:domainDataId,
    });
  }
  //手动匹配
  manualMatch=()=>{
    this.state.status='manualMatch';
    this.setState({
      display:'',
      manualMatchColor:'#1ABC9C',
      searchArithmeticColor:'#FFF5FD',
    });
    processor.getManualMatchData(null,null,null,null,null,this);
  }
  //提交
  handleSubmit = (e) => {
    e.preventDefault();
    var arr =[];
    let manufacturingPlantName=this.props.form.getFieldValue('manufacturingPlantName');
    let productName=this.props.form.getFieldValue('productName');
    let spec=this.props.form.getFieldValue('spec');
    let gtin=this.props.form.getFieldValue('gtin');
    this.props.form.validateFields((err, fieldsValue) => {
      arr.push(fieldsValue);
    });
    this.state.arr=arr;
    processor.getManualMatchData(manufacturingPlantName,productName,spec,gtin,null,this);
  }
  //稽核
  manualReview=()=> {
    let matchDegree=this.props.form.getFieldValue('matchDegree');
    if(this.state.selectedRows.length>0){
      var value=[];
      for(var i=0;i<this.state.selectedRows.length;i++) {
        var isChecked = this.state.selectedRows[i].isChecked;
        var gs1Gtin = this.state.selectedRows[i].gs1Gtin;
        if (isChecked === '1') {
          openNotificationWithIcon('warning', '所选数据为已稽核数据,请重新选择！');
          return;
        }
        if (gs1Gtin == null || this.isNull(gs1Gtin)) {
          openNotificationWithIcon('warning', '请检查，所稽核数据GTIN码为空！');
          return;
        }
        value.push(this.state.selectedRows[i])
      }
      pro.passUpdateIsCheckStatus(this.state.paginationValue, value, this.props, this.props.submitId, this.props.name);
      //稽核通过重新查询已稽核数据
      pro.loadDataOne(null, this.props, this.props.submitId, "haveAudit");
      //修改已稽核和未稽核的数量
      var num1=this.props.notAuditedNumArr[0];
      var num2=this.props.haveAuditNumArr[0];
      //稽核通过根据选中数据个数计算稽核和未稽核个数
      var notAudited= num1 - this.state.selectedRows.length;
      var haveAudit=  num2 + this.state.selectedRows.length;
      var notAuditedNumVal=this.props.notAuditedNumArr;
      var haveAuditNumVal=this.props.haveAuditNumArr;
      //清空稽核和未稽核数组里的个数
      notAuditedNumVal.splice(0,1);
      haveAuditNumVal.splice(0,1);
      //重新给稽核和未稽核数组里的个数赋值
      notAuditedNumVal.unshift(notAudited);
      haveAuditNumVal.unshift(haveAudit)
      this.state.divStatus[0]='none'
      this.setState({
        notAuditedNumArr:notAuditedNumVal,
        haveAuditNumArr:notAuditedNumVal,
        selectedRowKeys:[],
        selectedRows:[],
      })
      openNotificationWithIcon('success', '稽核成功!');
    }else{
        openNotificationWithIcon('warning', '至少选择一条进行稽核！');
    }
  }
  //渲染
  render() {
    const {selectedRowKeys} = this.state;
    const rowSelection  = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const { getFieldDecorator } = this.props.form;
    const childrenMenu = this.drawMenu();
    const divStatus=this.state.divStatus.length===0? this.state.divStatus[0]='none' : this.state.divStatus[0]
    return (
        <div>
          <div className="row" style={{marginLeft:0,marginRight:2}}>
            <SearchFromViewer dis={this.state.dis} name={this.props.name}
                               submitId={this.props.submitId}
                              dispatch={this.props.dispatch} rowKey={this.state.selectedRowKeys}
                              row={this.state.selectedRows}  divStatus={this.state.divStatus}/>
            <Button style={{marginTop:5}}   type="primary" onClick={this.manualReview}>
              稽核通过
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button style={{marginTop:5}}   type="primary">
              <Link to={`/gs1/newDataGovernance/UploadAndDownloadManagerViewer`}  >返回</Link>
            </Button>
            <Table rowKey="domainDataId" rowSelection={rowSelection} bordered  style={{marginTop:0}} columns={this.columns}
                   pagination={this.state.pagination} dataSource={this.state.data} onChange={this.loadData}
                   onRowClick={this.onCellClick} scroll={{ x: '130%' }}/>
          </div>
          <div style={{display:divStatus,marginTop:-20}}>
            <div  style={{border:'2px solid #E9E9E9',marginTop:10}}>
                <Button style={{width:150,marginTop:10,marginLeft:5,background:this.state.searchArithmeticColor}}   onClick={this.searchArithmetic}>
                  <center style={{color: '#110e09'}}>算法匹配</center>
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button style={{width:150,marginTop:10,background:this.state.manualMatchColor}}  onClick={this.manualMatch}>
                  <center style={{color: '#110e09'}}>手动匹配</center>
                </Button>
              <span style={{color:'#090909',fontSize:18,float:"right",marginRight:350,marginTop:8}}>
                参考标准数据
              </span>
              <br/>
              <div style={{display:this.state.display}}>
                <Form layout="inline" style={{marginTop:10}} onSubmit={this.handleSubmit}>
                  <FormItem   label="厂商">
                    {getFieldDecorator('manufacturingPlantName', {
                    })(
                      <Select  mode="combobox" allowClear style={{width:220}}>
                        {childrenMenu}
                      </Select>
                    )}
                  </FormItem>
                  <FormItem  label="产品" >
                    {getFieldDecorator('productName', {
                    })(
                      <Input  style={{width:100}}/>
                    )}
                  </FormItem>
                  <FormItem  label="型号" >
                    {getFieldDecorator('spec', {
                    })(
                      <Input style={{width:100}}/>
                    )}
                  </FormItem>
                  <FormItem  label="GTIN码" >
                    {getFieldDecorator('gtin', {
                    })(
                      <Input style={{width:100}}/>
                    )}
                  </FormItem>
                  <FormItem >
                    <Button size="default"  type="primary" htmlType="submit">查询</Button>
                  </FormItem>
                </Form>
              </div>
              <Table rowKey="productId" className="column-money" onChange={this.getManualMatchData}  bordered
                     columns={this.state.status==='manualMatch'? this.columns2:this.columns1} pagination={this.state.page}
                     dataSource={this.state.dataSource} scroll={{ x: '122%' }} />
            </div>
          </div>
        </div>
    );
  }
}

TabsOneViewer=Form.create()(TabsOneViewer);
const mapStateToProps = (store, ownProps) => {
  return {
    condition:store.GoveQuery.condition
  }
};
export default connect(
  mapStateToProps
)(TabsOneViewer);
