/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Form,Table,Button,Modal,Input,Popconfirm,sortedInfo } from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';

import ProductFormViewer from './ProductFormViewer';
import ProductManagerProcessor from './ProductManagerProcessor';

const FormItem = Form.Item;

const data = [];
const processor=new ProductManagerProcessor();
const pagination =[];
class ProductManagerViewer extends React.Component {
  state = {
    pagination,
    data,
    visible: false,
    selectedRowKeys:[],
    selectedRows:[],
  };
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
      },
      {
        title: '厂商编码',
        dataIndex: 'manuCode',
        key: 'manuCode',
        className:"column-money",
        sorter: (a, b) => a.manuCode.length - b.manuCode.length,
        onCellClick:this.onCellClick,
        render: text =><a>{text}</a>
      },{
        title: '当前状态',
        dataIndex: 'plantDataStatus',
        key: 'plantDataStatus',
        className:"column-money",
        sorter: (a, b) => a.gln.length - b.gln.length,
        // render: text =>{
        //   return text==1?'可用':'不可用'
        // }
      }, {
        title: '厂商名称',
        dataIndex: 'gs1ManuName',
        key: 'gs1ManuName',
        className:"column-money",
        sorter: (a, b) => a.gs1ManuName.length - b.gs1ManuName.length,
      }, {
        title: '最近更新',
        dataIndex: 'changeDateTime',
        key: 'changeDateTime',
        className:"column-money",
        sorter: (a, b) => a.changeDateTime - b.changeDateTime,
        render: text =>{
          return new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        }
      }, {
        title: 'gln',
        dataIndex: 'gln',
        key: 'gln',
        className:"column-money",
        sorter: (a, b) => a.gln.length - b.gln.length,
      }];
  }
  componentWillReceiveProps(newProps) {
    // if(newProps!=null&&newProps.condition!=null) {
    //   processor.formChange({total:0,pageSize:10,current:1,defaultCurrent:1},newProps.condition, this);
    // }
  };
  handleTableChange = (pagination, filters, sorter) => {
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
    this.props.form.setFieldsValue({
      gs1ManuName:record.gs1ManuName,
      plantDataStatus:record.plantDataStatus,
      createDateTime:new Date(parseInt(record.createDateTime) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "),
      changeDateTime:new Date(parseInt(record.changeDateTime) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "),
      changeBy:record.changeBy,
      createdBy:record.createdBy,
    });
  };
  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.setState({
      selectedRowKeys:selectedRowKeys,
      selectedRows:selectedRows,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 10},
      wrapperCol:{span: 14 },
    };
    const  {data} = this.props;
    const  {pagination} = this.props;
    const {selectedRowKeys} = this.state;
    const rowSelection  = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (
      <div>
        <ProductFormViewer selectedRowKeys={this.state.selectedRowKeys} selectedRows={this.state.selectedRows}
                           data={data} dispatch={this.props.dispatch} />
        <Table bordered rowSelection={rowSelection}
               columns={this.columns} pagination={pagination} onChange={this.handleTableChange} dataSource={data}
               onRowClick={this.onRowClick}
        />
        <Modal
          title="厂商信息"
          visible={this.state.visible}
          onOk={this.hideModal}
          maskClosable={false}
          onCancel={this.hideModal}
          width={500}
          footer={[
            <Button key="submit" type="primary" size="large" onClick={this.hideModal}>
              关闭
            </Button>
          ]}
        >
          <Form
            layout="inline"
            className="ant-advanced-search-form"
            onSubmit={this.handleSearch}
          >
            <FormItem  {...formItemLayout}  label={`厂商名称`}>
              {getFieldDecorator(`gs1ManuName`)(
                <Input disabled={true}  />
              )}
            </FormItem>
            <FormItem  {...formItemLayout}  label={`当前状态`}>
              {getFieldDecorator(`plantDataStatus`)(
                <Input  disabled={true} />
              )}
            </FormItem>
              <FormItem  {...formItemLayout}  label={`创建时间`}>
                {getFieldDecorator(`createDateTime`)(
                  <Input  disabled={true}  />
                )}
              </FormItem>
              <FormItem  {...formItemLayout}  label={`修改时间`}>
                {getFieldDecorator(`changeDateTime`)(
                  <Input  disabled={true}  />
                )}
              </FormItem>
              <FormItem  {...formItemLayout}  label={`创建人`}>
                {getFieldDecorator(`createdBy`)(
                  <Input  disabled={true}  />
                )}
              </FormItem>
              <FormItem  {...formItemLayout}  label={`修改人`}>
                {getFieldDecorator(`changeBy`)(
                  <Input  disabled={true}  />
                )}
              </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
const mapAccountStateToProps = state => ({
  data : state.MasterDataMenuReducer.data,
  pagination : state.MasterDataMenuReducer.pagination,
  params:state.MasterDataMenuReducer.params,
});
const  productManagerViewer =Form.create()(ProductManagerViewer);
export default connect(
  mapAccountStateToProps
)(productManagerViewer);
