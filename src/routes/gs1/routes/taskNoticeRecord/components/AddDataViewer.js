/**
 * Created by admin on 2017/7/10.
 */
import React, {Component} from 'react';
import { Table,Button, notification } from 'antd';
import { NavLink as Link } from 'react-router-dom'
import noticeRecordProcessor from './noticeRecordProcessor';

const data = [];
const  processor=new noticeRecordProcessor();

const columns = [{
  title: '序号',
  dataIndex: 'key',
  key: 'key',
  className:"column-money",
  render: (text, record, index) =>index+1,
  width:32,
},
  { title: '产品名称', dataIndex: 'productName',className:'column-money',
    sorter: (a, b) => a.productName.length - b.productName.length,},
  { title: '产品规格', dataIndex: 'spec',className:'column-money',
    sorter: (a, b) => a.spec.length - b.spec.length,},
  { title: '产品厂商', dataIndex: 'gln',className:'column-money',
    sorter: (a, b) => a.gln.length - b.gln.length,},
  { title: 'GTIN', dataIndex: 'gtin',className:'column-money',
    sorter: (a, b) => a.gtin.length - b.gtin.length,},
  { title: '产品企业', dataIndex: 'manufacturingPlantName',className:'column-money',
    sorter: (a, b) => a.manufacturingPlantName.length - b.manufacturingPlantName.length, },
  { title: '企业地址', dataIndex: 'manufacturingPlantAddress',className:'column-money',
    sorter: (a, b) => a.manufacturingPlantAddress.length - b.manufacturingPlantAddress.length, },
  { title: '产品状态', dataIndex:'plantDataStatus',className:'column-money',
    sorter: (a, b) => a.plantDataStatus.length - b.plantDataStatus.length, },
];
class SubmitDataViewer extends Component{
  state = {
    data,
    pagination:{pageSize:10},
    submitId:'',
    type:'',
    id:'',
  }
  //获取url后面参数
  getUrlParam=(name)=> {
    var reg = new RegExp("[?&]" + name + "=([^?&]*)[&]?", "i");
    var match = this.props.location.search.match(reg);
    return match == null ? "" : match[1];
  }
  componentDidMount() {
    var type=this.getUrlParam('name');
    var id=this.getUrlParam('id');
    this.setState({
      type:type,
      id:id
    });
    processor.queryNoticeRecordAll({total:0,pageSize:10,current:1,defaultCurrent:1},type,id,this);
  }
  loadData=(pagination, filters, sorter)=>{
      var condition =this.props.condition;
      if(pagination!=null) {
        processor.queryNoticeRecordAll(pagination,this.state.type,this.state.id,this);
      }
  };


  render() {
    return (
      <div>
        <div>
          <Button type="primary">
            <Link to={`/gs1/result/NoticeRecordManagerViewer`}>返回</Link>
          </Button>
        </div>
        <div>
          <Table style={{marginTop:5}} bordered columns={columns}  dataSource={this.state.data} pagination={this.state.pagination} onChange={this.loadData}/>
        </div>
      </div>
    )
  }
}
export default SubmitDataViewer;
