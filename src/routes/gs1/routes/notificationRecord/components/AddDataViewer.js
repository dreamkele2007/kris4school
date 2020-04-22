/**
 * Created by admin on 2017/7/10.
 */
import React, {Component} from 'react';
import { Table,Button, notification } from 'antd';
import { NavLink as Link } from 'react-router-dom'
import noticeRecordProcessor from './noticeRecordProcessor';

const data = [];
const  processor=new noticeRecordProcessor();

const columns = [
  { title: '产品名称', dataIndex: 'productName',
    sorter: (a, b) => a.productName.length - b.productName.length,},
  { title: '产品规格', dataIndex: 'spec',
    sorter: (a, b) => a.spec.length - b.spec.length,},
  { title: '产品厂商', dataIndex: 'gln',
    sorter: (a, b) => a.gln.length - b.gln.length,},
  { title: 'GTIN', dataIndex: 'gtin',
    sorter: (a, b) => a.gtin.length - b.gtin.length,},
  { title: '产品企业', dataIndex: 'manufacturingPlantName',
    sorter: (a, b) => a.manufacturingPlantName.length - b.manufacturingPlantName.length, },
  { title: '企业地址', dataIndex: 'manufacturingPlantAddress',
    sorter: (a, b) => a.manufacturingPlantAddress.length - b.manufacturingPlantAddress.length, },
  { title: '产品状态', dataIndex:'plantDataStatus',
    sorter: (a, b) => a.plantDataStatus.length - b.plantDataStatus.length, },
];
class SubmitDataViewer extends Component{
  state = {
    data,
    pagination:{pageSize:10},
    submitId:'',
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
    processor.queryNoticeRecordAll({total:0,pageSize:10,current:1,defaultCurrent:1},type,id,this);
  }



  render() {
    return (
      <div>
        <div>
          <Button type="primary">
            <Link to={`/gs1/result/NoticeRecordManagerViewer`}>返回</Link>
          </Button>
        </div>
        <div>
          <Table  columns={columns} dataSource={this.state.data} pagination={this.state.pagination} onChange={this.loadData}/>
        </div>
      </div>
    )
  }
}
export default SubmitDataViewer;
