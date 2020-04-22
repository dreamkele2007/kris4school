/**
 * Created by admin on 2017/7/10.
 */
import React, {Component} from 'react';
import {Table, Button} from 'antd';
import {NavLink as Link} from 'react-router-dom'
import {connect} from 'react-redux';
import DataProcessor from './UpdateRecordDataProcessor';
const processor = new DataProcessor();
const columns = [{
  // 	title: 'ID',
  // 	dataIndex: 'downId',
  // className:'column-money',
  // 	key: 'id',
  // 	sorter: (a, b) => a.id - b.id
  title: '序号',
  dataIndex: 'key',
  key: 'key',
  className:"column-money",
  render: (text, record, index) =>index+1,
  width:32,
}, {
	title: '产品名称',
	dataIndex: 'productName',className:'column-money',
	sorter: (a, b) => a.productName.length - b.productName.length,
}, {
	title: '产品规格',
	dataIndex: 'spec',className:'column-money',
	sorter: (a, b) => a.spec.length - b.spec.length,
}, {
	title: 'gln',
	dataIndex: 'gln',className:'column-money',
	sorter: (a, b) => a.gln.length - b.gln.length,
}, {
	title: 'GTIN',
	dataIndex: 'gtin',className:'column-money',
	sorter: (a, b) => a.gtin.length - b.gtin.length,
}, {
	title: '产品企业',
	dataIndex: 'manufacturingPlantName',className:'column-money',
	sorter: (a, b) => a.manufacturingPlantName.length - b.manufacturingPlantName.length,
}, {
	title: '企业地址',
	dataIndex: 'manufacturingPlantAddress',className:'column-money',
	sorter: (a, b) => a.manufacturingPlantAddress.length - b.manufacturingPlantAddress.length,
}, {
	title: '产品状态',
	dataIndex: 'plantDataStatus',className:'column-money',
	sorter: (a, b) => a.plantDataStatus.length - b.plantDataStatus.length,
}, ];
class UpdateRecordDataViewer extends Component {
		//获取url后面参数
	getUrlParam = (name) => {
		var reg = new RegExp("[?&]" + name + "=([^?&]*)[&]?", "i");
		var match = this.props.location.search.match(reg);
		return match == null ? "" : match[1];
	}
	componentWillMount() {
			var name = this.getUrlParam('name');
			var matchId = this.getUrlParam('id');
			console.log(matchId)
			processor.queryDataByPage({
				total: 0,
				pageSize: 10,
				current: 0,
				defaultCurrent: 0
			}, name, matchId, this.props);
		}

  handleTableChange = (pagination, filters, sorter) => {
    var name = this.getUrlParam('name');
    var matchId = this.getUrlParam('id');
    if (pagination != null) {
      processor.queryDataByPage(pagination, name, matchId, this);
    }
  };
	render() {
    const  {data} = this.props;
    const  {pagination} = this.props;
		return (
			<div>
        <div>
          <Button type="primary">
            <Link to={`/gs1/result/UpdateRecordManagerViewer`}>返回</Link>
          </Button>
        </div>
        <div>
          <Table bordered style={{marginTop:5}} columns={columns} dataSource={data} pagination={pagination} onChange={this.handleTableChange}/>
        </div>
      </div>
		)
	}
}
const mapStateToProps = (store) => {
  return {
    data:store.dataCheckDataReducer.data,
    pagination:store.dataCheckDataReducer.pagination,
  }
};

export default connect(
  mapStateToProps
)(UpdateRecordDataViewer);
