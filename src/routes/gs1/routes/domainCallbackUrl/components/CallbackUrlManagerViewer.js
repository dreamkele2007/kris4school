/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Form,Table,Button,Modal,Input,Popconfirm,sortedInfo } from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';

import ProductFormViewer from './CallbackUrlFromViewer';
import ProductManagerProcessor from './CallbackUrlManagerProcessor';

const FormItem = Form.Item;

const data = [];
const processor=new ProductManagerProcessor();
const pagination =[];

class ProductManagerViewer extends React.Component {
  state = {
    pagination,
    data,
    visible: false,
    selectedRows:[],
    selectedRowKeys: [],
  };
  constructor(props) {
    super(props);
  this.columns = [{
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        className:"column-money",
        render: (text, record, index) =>index+1,
        width:32,
      },
      {
        title: '租户名称',
        dataIndex: 'domainName',
        key: 'domainName',
        className:"column-money",
        sorter: (a, b) => a.domainName.length - b.domainName.length,

        render: text =><a>{text}</a>
      }, {
        title: '访问地址',
        dataIndex: 'noticeUrl',
        key: 'noticeUrl',
        className:"column-money",
        sorter: (a, b) => a.noticeUrl.length - b.noticeUrl.length,
      },{
        title: '状态',
        dataIndex: 'isStop',
        key: 'isStop',
        className:"column-money",
        sorter: (a, b) => a.isStop- b.isStop,
      }, {
        title: 'token',
        dataIndex: 'token',
        key: 'token',
        className:"column-money",
        sorter: (a, b) => a.token - b.token,
      }, {
        title: '备注',
        dataIndex: 'note',
        key: 'note',
        className:"column-money",
        sorter: (a, b) => a.note.length- b.note.length,
      }];
  }
  componentWillReceiveProps(newProps) {
    const arr=[];
    this.setState({
      selectedRowKeys:arr
    });
    // if(newProps!=null&&newProps.condition!=null)
    // {
    //   processor.formChange({total:0,pageSize:10,current:1,defaultCurrent:1},newProps.condition, this);
    // }
  };

  onSelectChange = (selectedRowKeys,selectedRows) => {
  console.log(selectedRowKeys,selectedRows);
    this.state.selectedRows=selectedRows;
    this.setState({ selectedRowKeys });
  };
  handleTableChange = (pagination, filters, sorter) =>
  {
    var condition =this.props.condition;
    if(pagination!=null) {
      processor.tableChange(pagination,condition,this.props);
    }
  };
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  onCellClick = (record, index)=> {
    this.setState({
      visible: true,
    });

    this.props.form.setFieldsValue(record);
  };


  render() {
    const  {data} = this.props;
    const  {pagination} = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <ProductFormViewer selectedRows={this.state.selectedRows} selectedRowKeys={this.state.selectedRowKeys}  data={this.state.data} dispatch={this.props.dispatch} />
        <Table bordered rowKey="id" rowSelection={rowSelection}   columns={this.columns} pagination={pagination} onChange={this.handleTableChange} dataSource={data}  />
      </div>
    );
  }
}
const mapAccountStateToProps = state => ({
  data : state.DomainQuery.data,
  pagination : state.DomainQuery.pagination,
  params:state.DomainQuery.params,
});
const  productManagerViewer =Form.create()(ProductManagerViewer);
export default connect(
  mapAccountStateToProps
)(productManagerViewer);
