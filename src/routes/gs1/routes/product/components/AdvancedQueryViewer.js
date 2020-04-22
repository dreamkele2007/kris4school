/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Form,Button,Input,Menu,Dropdown,Modal} from 'antd';
import 'antd/dist/antd.css';
import AdvancedQueryProcessor from './AdvancedQueryProcessor';
import IncreaseConditions from './IncreaseConditions';
const processor=new AdvancedQueryProcessor();
const Search = Input.Search;
class AdvancedQueryViewer extends React.Component {
  state = {
    data:[],
    form:[],
    ConditionalData: [],
    visible: false,
    visible1: false,
    flag:[],
    display:'none',
    value:[]
  };
  onSelectChange = (ConditionalData) => {
    var arr= this.state.ConditionalData;
    arr.push(ConditionalData);
    this.setState({ ConditionalData :arr});
  }
  handleVisibleClick = (visible) => {
    this.setState({ visible });
  }
  changeStatus(display){
    this.setState({
      display
    })
  }
  handleClick = (e) => {
    e.preventDefault();
    this.setState({visible: false,uuid:this.state.form.length});
    this.props.form.validateFields((err,values) => {
      this.onSelectChange(values);
     });
  }
  onRowClick = ()=> {
    console.log(this.state.flag);
      this.setState({visible:true});
  };

  cancelForm=()=>{
    this.setState({visible:false,display:'none'});
  };
  saveForm=(e)=>{
    var a = this.state.value[this.state.value.length-1];
    if(a===null || a===''){
      a='all'
    }
    processor.handleSubmit({total:0,pageSize:10,current:1,defaultCurrent:1},this.state.ConditionalData,a,this.props);
    this.setState({visible:false});
  };
  quickQuery=(value)=>{
    processor.quickQuery({total:0,pageSize:10,current:1,defaultCurrent:1},value,this.props);
  };
  likeQueryProduct = (value) => {
    processor.likeQueryProduct({total:0,pageSize:10,current:1,defaultCurrent:1},value,this.props);
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a   onClick={()=>{this.quickQuery('month')}}>最近一个月</a>
        </Menu.Item>
        <Menu.Item>
          <a   onClick={()=>{this.quickQuery('year')}}>最近一年</a>
        </Menu.Item>
        <Menu.Item>
          <a   onClick={()=>{this.quickQuery('all')}}>全部</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
       <Search
         placeholder="编码/产品名称"
         style={{ width:160}}
         onSearch={this.likeQueryProduct}
         maxLength="20"
       />
      <span style={{float:'right'}}>
            <Dropdown  className="divTable" style={{height:20}} overlay={menu} trigger={['click']}>
                  <Button type="primary" >快速查询</Button>
           </Dropdown>
               <Button  type="primary"  style={{marginLeft:5}} onClick={this.onRowClick}>高级查询11</Button>

        <Modal
          title="高级查询"
          visible={this.state.visible}
          onOk={this.saveForm}
          onCancel={this.cancelForm}
          width={600}
          maskClosable={false}
        >
         <IncreaseConditions flag={this.state.flag} value={this.state.value}
                             ConditionalData={this.state.ConditionalData}
                             display={this.state.display}
                             changeStatus={display =>this.changeStatus(display)}
         />
        </Modal>
      </span>
      </div>

    );
  }
}
const  advancedQueryViewer =Form.create()(AdvancedQueryViewer)
export default advancedQueryViewer;
