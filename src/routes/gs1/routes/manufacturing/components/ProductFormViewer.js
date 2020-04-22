/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Form,Input} from 'antd';
import 'antd/dist/antd.css';
import ProductFormProcessor from './ProductFormProcessor';
import AdvancedQueryViewer from './AdvancedQueryViewer'
const Search = Input.Search;
const pagination=[];
const  processor = new ProductFormProcessor();
class ProductFormViewer extends React.Component {
  state = {
    data:[],
    pagination,
  };
  likeQueryProduct = (value) => {
    processor.likeQueryProduct({total:0,pageSize:10,current:1,defaultCurrent:1},value,this.props);
  }
  componentWillMount(){
    processor.likeQueryProduct({total:0,pageSize:10,current:1,defaultCurrent:1},'',this.props);
  }
render() {
  return (
    <div style={{width:'100%',display:'inline-block'}}>
      <div style={{float:'left'}}>
       <Search
         placeholder="厂商名称"
         style={{ width: 160 }}
         onSearch={this.likeQueryProduct}
         maxLength="20"
       />
      </div>
        <AdvancedQueryViewer selectedRowKeys={this.props.selectedRowKeys} selectedRows={this.props.selectedRows} dispatch={this.props.dispatch}/>
    </div>
);
}
}
const  productFormViewer=Form.create()(ProductFormViewer);
export default productFormViewer;
