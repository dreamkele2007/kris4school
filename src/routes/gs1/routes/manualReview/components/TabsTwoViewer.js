/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import {Table,Button,Form,notification} from 'antd';
import 'antd/dist/antd.css';
import './form.css';
import { NavLink as Link } from 'react-router-dom'
import {connect} from 'react-redux';
import SearchFromViewerOne from './SearchFromViewerOne';
import ManualReviewManagerProcessor from './ManualReviewManagerProcessor';
import SearchFromProcessor from './SearchFromProcessor';
const  data=[];
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
class TabsTwoViewer extends React.Component {
  state = {
    pagination:{pageSize:10},
    selectedRowKeys:[],
    selectedRows:[],
    arr:[],
    page:{pageSize:10},
    data,
    name:'',
    menuName:[],
    paginationValue:{total:0,pageSize:10,current:1,defaultCurrent:1},
    notAuditedNumArr:this.props.notAuditedNumArr,
    haveAuditNumArr:this.props.haveAuditNumArr,
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
    }, {
      title: '是否修改',
      textAlign:'center',
      dataIndex: 'isEdit',
      key: 'isEdit',
      sorter: (a, b) => a.isEdit - b.isEdit,
      render: (text,record) =>text==null||text==='0'? '' : <center><strong style={{color:'#ff1515',fontSize:10,textAlign:'center'}}>*</strong></center>,
      className:'column-money',
      width:100,
    }, {
      title: '是否已稽核',
      textAlign:'center',
      dataIndex: 'isChecked',
      key: 'isChecked',
      sorter: (a, b) => a.isChecked - b.isChecked,
      render: (text,record) =>text==null||text==='0'? <center><strong style={{color:'#000000',fontSize:10,textAlign:'center'}}>×</strong></center> : <center><strong style={{color:'#000000',fontSize:10,textAlign:'center'}}>√</strong></center>,
      className:'column-money',
      width:110,
    },{
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      className:'column-money',
      sorter: (a, b) => a.productName.length - b.productName.length,
    },{
      title: '规格',
      dataIndex: 'spec',
      key: 'spec',
      className:'column-money',
      margin: 'auto',
      sorter: (a, b) => a.spec - b.spec,
    },{
      title: '厂商',
      dataIndex: 'manufacturingPlantName',
      key: 'manufacturingPlantName',
      className:'column-money',
      margin: 'auto',
      sorter: (a, b) => a.manufacturingPlantName.length - b.manufacturingPlantName.length,
    },{
      title: '企业地址',
      dataIndex: 'manufacturingPlantAddress',
      key: 'manufacturingPlantAddress',
      className:'column-money',
      margin: 'auto',
      sorter: (a, b) => a.manufacturingPlantAddress.length - b.manufacturingPlantAddress.length,
    },{
        title: '院方编码',
        dataIndex: 'hospitalCode',
        key: 'hospitalCode',
        className:'column-money',
        sorter: (a, b) => a.hospitalCode - b.hospitalCode,
      },{
      title: 'GTIN码',
      dataIndex: 'gs1Gtin',
      key: 'gs1Gtin',
      className:'column-money',
      sorter: (a, b) => a.gs1Gtin - b.gs1Gtin,
    }];
  }
  //页面加载
  componentWillMount() {
    this.setState({
      submitId: this.props.submitId,
      dataSource:[],
      name:'haveAudit',
    });
  }
  //组件变更
  componentWillReceiveProps(newProps) {
    if(newProps!=null&&newProps.condition!=null) {
      processor.formChange1(null,newProps.condition,this);
    }
  };
  //多选框选中
  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.setState({
      selectedRowKeys:selectedRowKeys,
      selectedRows:selectedRows,
      dis:'none',
    });
  }
  //分页
  loadDataOne =(pagination, filters, sorter) =>{
    var name=this.props.name;
    if(pagination!=null && this.props.submitId !=='') {
      processor.tableLoadDataOne(this.props,pagination,this.props.submitId,name);
      this.setState({
        paginationValue:pagination,
        selectedRowKeys:[],
        selectedRows:[],
        dis:'none',
      });
    }
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
  //取消稽核
  cancelTheAudit=()=>{
    if(this.state.selectedRows.length>0){
      var value=[];
      for(var i=0;i<this.state.selectedRows.length;i++) {
        value.push(this.state.selectedRows[i])
      }
      pro.cancelTheAudit(null, value, this.props, this.props.submitId, this.props.name);
      //取消稽核重新查询未稽核数据
      pro.loadData(null, this.props, this.props.submitId, "notAudited");
      //获得稽核和未稽核个数
      var num1=this.props.notAuditedNumArr[0];
      var num2=this.props.haveAuditNumArr[0];
      //根据选中数进行计算取消以后稽核和未稽核的个数
      var notAudited=num1+this.state.selectedRowKeys.length;
      var haveAudit=num2-this.state.selectedRowKeys.length;
      var notAuditedNumArr=this.props.notAuditedNumArr;
      var haveAuditNumArr=this.props.haveAuditNumArr;
      //清空稽核和未稽核数组里的个数
      notAuditedNumArr.splice(0,1);
      haveAuditNumArr.splice(0,1);
      //重新个稽核和未稽核数组的个数赋值
      notAuditedNumArr.unshift(notAudited);
      haveAuditNumArr.unshift(haveAudit);
      this.setState({
        notAuditedNumArr:notAuditedNumArr,
        haveAuditNumArr:haveAuditNumArr,
        selectedRowKeys:[],
        selectedRows:[],
      })
      openNotificationWithIcon('success', '取消成功!');
    }else{
      openNotificationWithIcon('warning', '至少选择一条进行取消稽核！');
    }
  }
  //渲染
  render() {
    const {selectedRowKeys} = this.state;
    const rowSelection  = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (
      <div>
        <div className="row" style={{marginLeft:0}}>
          <SearchFromViewerOne dis={this.state.dis} name={this.props.name} submitId={this.props.submitId}
          dispatch={this.props.dispatch}  rowKey={this.state.selectedRowKeys} row={this.state.selectedRows}
          />
          <Button style={{marginTop:5}}   type="primary" onClick={this.cancelTheAudit}>
            取消稽核
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button style={{marginTop:5}}  type="primary">
            <Link to={`/gs1/newDataGovernance/UploadAndDownloadManagerViewer`}  >返回</Link>
          </Button>
        </div>
        <Table rowKey="domainDataId" rowSelection={rowSelection}   bordered  style={{marginTop:0}} columns={this.columns}
               pagination={this.state.pagination} dataSource={this.state.data} onChange={this.loadDataOne}/>
      </div>
    );
  }
}

TabsTwoViewer=Form.create()(TabsTwoViewer);
const mapStateToProps = (store, ownProps) => {
  return {
    condition:store.GoveQueryOne.condition
  }
};
export default connect(
  mapStateToProps
)(TabsTwoViewer);
