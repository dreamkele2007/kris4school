/**
 * Created by admin on 2017/8/14.
 */
import React from 'react';
import {Table} from 'antd';
import {connect} from 'react-redux';
import RegisterDomainManagerProcessor from './RegisterDomainManagerProcessor'
import RegisterDomainFormViewer from './RegisterDomainFormViewer'
const pagination=[];
const processor = new RegisterDomainManagerProcessor();
class  RegisterDomainManagerViewer extends React.Component{
  state={
    data:[],
    selectedRowKeys: [],
    pagination,
    selectedRows:[]
  };
  constructor(props) {
    super(props);
    this.columns = [
     {
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
      }, {
        title: 'token',
        dataIndex: 'token',
        key: 'token',
        className:"column-money",
        width:160,
        sorter: (a, b) => a.token - b.token,
      }, {
        title: '是否停用',
        dataIndex: 'isStop',
        key: 'isStop',
        className:"column-money",
        sorter: (a, b) => a.isStop - b.isStop,
        // render: text => <p>{text==0?'停用':'启用'}</p>,
      }];
  }
  componentWillReceiveProps(newProps) {
    if(newProps!=null&&newProps.condition!=null) {
      processor.formChange({total:0,pageSize:10,current:1,defaultCurrent:1},newProps.condition, this);
    }
    this.setState({
      flag:true
    });
  };
  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.state.selectedRows=selectedRows;
    this.setState({ selectedRowKeys });
    console.log(this.state.selectedRows);
  };
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <div style={{width:'100%',display:'inline-block'}}>
          <RegisterDomainFormViewer dispatch={this.props.dispatch} selectedRowKeys={this.state.selectedRowKeys} selectedRows={this.state.selectedRows}/>
        </div>
        <Table rowSelection={rowSelection} pagination={this.state.pagination}    columns={this.columns} dataSource={this.state.data} />
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => {

  return {
    condition:store.HospitalQuery.condition,
  }
};

export default connect(
  mapStateToProps
)(RegisterDomainManagerViewer);
