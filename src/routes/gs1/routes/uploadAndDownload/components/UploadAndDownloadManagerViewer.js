/**
 * Created by admin on 2017/7/26.
 */
import React from 'react';
import {Modal,Button,Table,notification,Spin} from 'antd';
import OperationViewer from './OperationViewer';
import {connect} from 'react-redux';
import './loading.css';
import  DatePickerViewer from './DatePickerViewer';
import  UploadMenu from './UploadMenu'
import  UploadAndDownloadManagerProcessor from './UploadAndDownloadManagerProcessor';
const processor=new UploadAndDownloadManagerProcessor()
const data=[];
const dataValue=[];
class UploadAndDownloadManagerViewer extends React.Component {
  //时间格式转换
  formatDate=(now) =>{
      var date = new Date(now);
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
      return currentdate;
  }
  constructor(props) {
    super(props);
    this.columns = [
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
      onCellClick:this.onCellClick,
      render: text =>{
        return text==null? null:text.substring(59,text.length);
      }
    },
      // {
      //   title: '所属用户',
      //   dataIndex: 'contacts',
      //   key: 'contacts',
      //   className:'column-money',
      //   sorter: (a, b) => a.contacts.length - b.contacts.length,
      // },
      {
      title: '上传日期',
      dataIndex: 'submitTime',
      key: 'submitTime',
      className:'column-money',
      sorter: (a, b) => a.submitTime - b.submitTime,
      render: text =>{
        return text==null||text===''? null:new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        // return text==null||text==''? null:this.formatDate(text);
      }
    }, {
      title: '执行完成日期',
      dataIndex: 'lastMatchTime',
      key: 'lastMatchTime',
      className:'column-money',
      sorter: (a, b) => a.lastMatchTime - b.lastMatchTime,
      render: text =>{
        return text==null||text===''? '未执行完':new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        // return text==null||text==''? '未执行':this.formatDate(text);
      }
    }, {
      title: '稽核完成日期',
      dataIndex: 'checkFinshDate',
      key: 'checkFinshDate',
      className:'column-money',
      sorter: (a, b) => a.checkFinshDate - b.checkFinshDate,
      render: text =>{
        return text==null||text===''? '未稽核完':new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        // return text==null||text==''? '未稽核':this.formatDate(text);
      }
    },{
      title: '当前状态',
      dataIndex: 'status',
      key: 'status',
      className:'column-money',
      sorter: (a, b) => a.status - b.status,
      render: (text,record) => <p>{text===0?'未检查':text===1?'检查中':text===2? '已检查':'已稽核'}</p>
    }, {
      title: '操作',
      dataIndex: 'operation',
      key:'operation',
      className:'column-money',
      render: (text, record, index) => {
        return (
          this.state.data.length > 0 ? (
            <div>
               <OperationViewer record={record} changeLoading={loading =>this.changeLoading(loading)} dispatch={this.props.dispatch} />
            </div>
          ) : null
        );
      },
    } ];
    this.columns1 = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        className:"column-money",
        render: (text, record, index) =>index+1,
        width:32,
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
        sorter: (a, b) => a.spec.length - b.spec.length,
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
  state = {
    pagination:{pageSize:10},
    page:{pageSize:10},
    data,
    dataValue,
    submitId:'',
    visible: false,
    loading:false,
  }
  componentWillReceiveProps(newProps) {
    if(this.state.loading[0]===true){
      return;
    }else {
      if (newProps != null && newProps.condition != null) {
        processor.formChange(null, newProps.condition, this);
      }
    }
  };
  loadDomainSubmitData =(pagination, filters, sorter) =>{
    if(pagination!=null) {
      processor.loadDomainSubmitData(this,pagination,);
    }
  }
  //点开查看本次提交数据
  onCellClick=(record, index)=>{
    this.setState({
      visible: true,
      submitId:record.submitId,
    });
    processor.getSubmitData(this,null,record.submitId)
  }
  //分页
  loadDomainData =(pagination, filters, sorter) =>{
    if(pagination!=null) {
      processor.getSubmitData(this,pagination,this.state.submitId);
    }
  }
  //关闭Model
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  //改变遮盖状态值
  changeLoading(loading){
    this.setState({
      loading
    })
  }
  render() {
    return (
          <Spin tip="正在执行，请稍后。。。" spinning={this.state.loading} >
              <div style={{width:'100%',display:'inline-block'}}>
                 <div style={{float:'left'}}>
                    <DatePickerViewer  dispatch={this.props.dispatch} condition={this.props.condition}/>
                 </div>
                 <div style={{float:'right'}}>
                   <UploadMenu dispatch={this.props.dispatch} condition={this.props.condition} />
                 </div>
              </div>
                 <Table rowKey="submitId" bordered columns={this.columns} onChange={this.loadDomainSubmitData}
                       pagination={this.state.pagination} dataSource={this.state.data}/>
             <Modal
                title="详情信息"
                visible={this.state.visible}
                maskClosable={false}
                onCancel={this.handleCancel}
                width={900}
                footer={[
                  <Button key="back" size="large" type="primary" onClick={this.handleCancel}>关闭</Button>,
                ]}
              >
              <Table bordered dataSource={this.state.dataValue} columns={this.columns1} pagination={this.state.page}
                     rowKey="domainDataId"   onChange={this.loadDomainData}/>
          </Modal>

          </Spin>
    );
  }
}
const mapStateToProps = (store, ownProps) => {
  return {
    condition:store.GoveDataQuery.condition
  }
};

export default connect(
  mapStateToProps
)(UploadAndDownloadManagerViewer);
