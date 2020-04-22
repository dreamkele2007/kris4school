/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Form } from 'antd';
import 'antd/dist/antd.css';
import DomainDictFormProcessor from './DomainDictFormProcessor';
import AdvancedQueryViewer from './AdvancedQueryViewer'
const pagination=[];
const  processor = new DomainDictFormProcessor();
class ProductFormViewer extends React.Component {
  state = {
    data:[],
    pagination,
  };
  componentWillMount(){
    processor.queryDomainDataDict({total:0,pageSize:10,current:1,defaultCurrent:1},null,this.props);
  }
  render() {
    return (
        <div>
            <AdvancedQueryViewer dispatch={this.props.dispatch}/>
        </div>
      );
  }
}
const  productFormViewer=Form.create()(ProductFormViewer);
export default productFormViewer;





