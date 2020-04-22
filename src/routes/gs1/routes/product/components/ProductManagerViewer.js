/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Form,Table,Button,Modal,Input,Popconfirm,sortedInfo } from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import ProductFormViewer from './ProductFormViewer';
import ProductManagerProcessor from './ProductManagerProcessor';


const data = [];
const processor=new ProductManagerProcessor();
const pagination =[];
const FormItem = Form.Item;
class ProductManagerViewer extends React.Component {
  state = {
    pagination,
    data,
    visible: false,
    imgValue:''
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
    }, {
      title: 'GTIN',
      dataIndex: 'gtin',
      key: 'gtin',
      className:"column-money",
      sorter: (a, b) => a.gtin - b.gtin,
      onCellClick:this.onCellClick,
      render: text =><a>{text}</a>
    }, {
      title: '当前状态',
      dataIndex: 'productdataStatus',
      key: 'productdataStatus',
      className:"column-money",
      sorter: (a, b) => a.productdataStatus.length - b.productdataStatus.length,
      // render: text =>{
      //   return text==1?'正常':'停用'
      // }
    }, {
      title: 'GPC分类码',
      dataIndex: 'gpcCatagoryCode',
      key: 'gpcCatagoryCode',
      className:"column-money",
      sorter: (a, b) => a.gpcCatagoryCode.length - b.gpcCatagoryCode.length,
    }, {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      className:"column-money",
      sorter: (a, b) => a.productName.length - b.productName.length,
    },{
      title: '产品更新时间',
      dataIndex: 'changedataTime',
      key: 'changedataTime',
      className:"column-money",
      sorter: (a, b) => a.changedataTime - b.changedataTime,
      render: text =>{
        return new Date(parseInt(text) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      }
    }, {
      title: '厂商',
      dataIndex: 'manufacturingPlantName',
      key: 'manufacturingPlantName',
      className:"column-money",
      sorter: (a, b) => a.manufacturingPlantName==null? '' : a.manufacturingPlantName.length -
      b.manufacturingPlantName==null?'': b.manufacturingPlantName.length,
    }, {
      title: '产品规格',
      dataIndex: 'spec',
      key: 'spec',
      className:"column-money",
      sorter: (a, b) => a.spec==null? '' : a.spec.length -
      b.spec==null?'': b.spec.length,
    }];
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  onCellClick = (record, index)=> {
    this.setState({
      visible: true,
    });
    record.createdataTime=new Date(parseInt(record.createdataTime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    record.changedataTime=new Date(parseInt(record.changedataTime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    this.state.imgValue=record.imageLink;
    this.props.form.setFieldsValue(record);
  };
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
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 10},
      wrapperCol:{span: 14 },
    };
    const  {data} = this.props;
    const  {pagination} = this.props;
    return (
      <div>
        <ProductFormViewer  data={data} dispatch={this.props.dispatch} />
        <Table rowKey="productId" bordered style={{marginTop:5}} columns={this.columns} pagination={pagination} dataSource={data} onChange={this.handleTableChange} onRowClick={this.onRowClick} />
        <Modal
          title="产品信息"
          visible={this.state.visible}
          onOk={this.hideModal}
          maskClosable={false}
          onCancel={this.hideModal}
          okText="确认"
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
          >
            <FormItem  {...formItemLayout}  label={`产品名称`}>
              {getFieldDecorator(`productName`)(
                <Input disabled={true}  />
              )}
            </FormItem>
            <FormItem  {...formItemLayout}  label={`产品厂商`}>
              {getFieldDecorator(`manufacturingPlantName`)(
                <Input  disabled={true}  />
              )}
            </FormItem>
            <FormItem  {...formItemLayout}  label={`厂商商标`}>
              {getFieldDecorator(`brandName`)(
                <Input  disabled={true}  />
              )}
            </FormItem>
            <FormItem  {...formItemLayout}  label={`产品状态`}>
              {getFieldDecorator(`productdataStatus`)(
                <Input  disabled={true} />
              )}
            </FormItem>
            <FormItem  {...formItemLayout}  label={`产品规格`}>
              {getFieldDecorator(`spec`)(
                <Input disabled={true}  />
              )}
            </FormItem>
            <FormItem  {...formItemLayout}  label={`产品介绍`}>
              {getFieldDecorator(`productDescription`)(
                <Input  disabled={true}  />
              )}
            </FormItem>
              <FormItem  {...formItemLayout}  label={`GPC分类码`}>
                {getFieldDecorator(`gpcCatagoryCode`)(
                  <Input  disabled={true}  />
                )}
              </FormItem>
              <FormItem  {...formItemLayout}  label={`GTIN码`}>
                {getFieldDecorator(`gs1Gtin`)(
                  <Input  disabled={true}  />
                )}
              </FormItem>
              <FormItem style={{textAlign:'center'}}  {...formItemLayout}  label={`商品图片`}>
                {getFieldDecorator(`imageLink`)(
                  <img width={120} height={90} src={this.state.imgValue} />
                )}
              </FormItem>
              <FormItem  {...formItemLayout}  label={`gln`}>
                {getFieldDecorator(`gln`)(
                  <Input  disabled={true}  />
                )}
              </FormItem>
              <FormItem  {...formItemLayout}  label={`产品信息连接`}>
                {getFieldDecorator(`productInfomationLink`)(
                  <Input  disabled={true}  />
                )}
              </FormItem>
              <FormItem  {...formItemLayout}  label={`注册时间`}>
                {getFieldDecorator(`createdataTime`)(
                  <Input  disabled={true}  />
                )}
              </FormItem>
              <FormItem  {...formItemLayout}  label={`修改时间`}>
                {getFieldDecorator(`changedataTime`)(
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
  data : state.ProductQUERY.data,
  pagination : state.ProductQUERY.pagination,
  params:state.ProductQUERY.params,
});
const  productManagerViewer =Form.create()(ProductManagerViewer);
export default connect(
  mapAccountStateToProps
)(productManagerViewer);
