/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { NavLink as Link } from 'react-router-dom'
import { Table,Button,Input,Modal } from 'antd';
import 'antd/dist/antd.css';
import indexProcessor from './indexProcessor';
import {connect} from 'react-redux';
const pagination =[];
const processor=new indexProcessor();
const columns = [
  {
    title: '序号',
    dataIndex: 'productId',
    key: 'productId',
    sorter: (a, b) => a.productId.length - b.productId.length,
  },
  {
    title: '厂商编码',
    dataIndex: 'gtin',
    key: 'gtin',
    sorter: (a, b) => a.gtin.length - b.gtin.length,
  }, {
    title: '产品名称',
    dataIndex: 'productName',
    key: 'productName',
    sorter: (a, b) => a.productName.length - b.productName.length,
  }, {
    title: '产品备注',
    dataIndex: 'productDescription',
    key: 'productDescription',
    sorter: (a, b) => a.productDescription.length - b.productDescription.length,
  }, {
    title: 'GTIN',
    dataIndex: 'gpcCatagoryCode',
    key: 'gpcCatagoryCode',
    sorter: (a, b) => a.gpcCatagoryCode.length - b.gpcCatagoryCode.length,
  }, {
    title: '产品规格',
    dataIndex: 'spec',
    key: 'spec',
    sorter: (a, b) => a.spec.length - b.spec.length,
  }, {
    title: '商标名称',
    dataIndex: 'brandName',
    key: 'brandName',
    sorter: (a, b) => a.brandName.length - b.brandName.length,
  }, {
    title: '产品注册时间',
    dataIndex: 'createdataTime',
    key: 'createdataTime',
    sorter: (a, b) => a.createdataTime.length - b.createdataTime.length,
    render: text =>{
      return new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }
  }, {
    title: '产品更新时间',
    dataIndex: 'changedataTime',
    key: 'changedataTime',
    sorter: (a, b) => a.changedataTime.length - b.changedataTime.length,
    render: text =>{
      return new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }
  }];
class HistoryUpdateRecord extends React.Component {
  state = {
    data:[],
    dataSource:[],
    pagination,
  };
  constructor(props) {
    super(props);
    this.columns = [{

      title: '序号',
      dataIndex: 'matchId',
      key: 'matchId',
      sorter: (a, b) => a.id.length - b.id.length,
    }, {
      title: '新增',
      dataIndex: 'newNum',
      key: 'newNum',
      sorter: (a, b) => a.newNum.length - b.newNum.length,
      onCellClick:this.onCellClickAdd,
      // render: (text,record) => <Link to={`/gs1/product?name=add&id=`+record.matchId}>{text}</Link>,
    }, {
      title: '更新',
      dataIndex: 'updateNum',
      key: 'updateNum',
      onCellClick:this.onCellClickUpdate,
      sorter: (a, b) => a.updateNum.length - b.updateNum.length,
      // render: (text,record) =><Link to={`/gs1/product?name=updata&id=`+record.matchId} >{text}</Link>,
    }, {
      title: '注销',
      dataIndex: 'cancelNum',
      key: 'cancelNum',
      onCellClick:this.onCellClickCancelNum,
      sorter: (a, b) => a.cancelNum.length - b.cancelNum.length,
      // render: (text,record) =><Link to={`/gs1/product?name=cancel&id=`+record.matchId} >{text}</Link>,
    },{
      title: '更新时间',
      dataIndex: 'matchDatetime',
      key: 'matchDatetime',
      sorter: (a, b) => a.matchDatetime.length - b.matchDatetime.length,
      render: text =>{
        return new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      }
    }
    ];
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  onCellClickAdd=(record,index)=>{
    processor.productHistory({total:0,pageSize:10,current:1,defaultCurrent:1},'add',record.matchId,this);
    this.setState({
      visible: true});
  };
  onCellClickUpdate=(record,index)=>{
    processor.productHistory({total:0,pageSize:10,current:1,defaultCurrent:1},'update',record.matchId,this);
    this.setState({
      visible: true});
  };
  onCellClickCancelNum=(record,index)=>{
    processor.productHistory({total:0,pageSize:10,current:1,defaultCurrent:1},'cancel',record.matchId,this);
    this.setState({
      visible: true});
  };

  componentWillMount(){
    processor.historicalRecord({total:0,pageSize:2,current:1,defaultCurrent:1},this);
  }
  render() {

    return (
      <div>
        <Button type="primary">
          <Link to={`/gs1`} >返回</Link>
        </Button>
        <Table  columns={this.columns} pagination={this.state.pagination} dataSource={this.state.data} />
        <Modal
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          width={1200}
          okText="确认"
          footer={[]}
        >
          <Table  columns={columns}  onChange={this.handleTableChange}  pagination={this.state.pagination} dataSource={this.state.dataSource} />
        </Modal>
      </div>
    );
  }
}

export default HistoryUpdateRecord;
