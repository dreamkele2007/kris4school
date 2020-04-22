/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Form,Select,Button,Input,Menu,Dropdown,Modal} from 'antd';
import 'antd/dist/antd.css';
import './advanced-query.css';
import AdvancedQueryProcessor from './AdvancedQueryProcessor';
import IncreaseConditions from './IncreaseConditions';
const Option = Select.Option;
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
    value:[],
    domainName:[],
  };
  onSelectChange = (ConditionalData) => {
    var arr= this.state.ConditionalData;
    arr.push(ConditionalData);
    this.setState({ ConditionalData :arr});
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
      this.setState({visible:true});
  };
  componentWillMount(){
    processor.queryDomain(data => {
      //下面的就是请求来的数据
      var result = data.getSinglePrimary();
      this.setState({
        domainName:result
      })
    });
  }
  drawTaskTypes(){
    const children =[];
    for (let i = 0; i < this.state.domainName.length; i++) {
      var obj = this.state.domainName[i];
      children.push(<Option value={obj.domainId
      }>{obj.domainName}</Option>);
    }
    return children;
  }
  cancelForm=()=>{
    this.setState({visible:false});
    this.state.display='none';

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
  queryDomainDataDict = (value) => {
    processor.queryDomainDataDict({total:0,pageSize:10,current:1,defaultCurrent:1},value,this.props);
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
         placeholder="请输入GTIN/产品名称"
         style={{ width:160}}
         onSearch={this.queryDomainDataDict}
         maxLength="20"
       />
        <span style={{float:'right'}}>
              <Dropdown  overlay={menu} trigger={['click']}>
                <Button type="primary" >快速查询</Button>
             </Dropdown>
             <Button  type="primary"  style={{marginLeft:5}} onClick={this.onRowClick}>高级查询</Button>

          <Modal
            title="高级查询"
            visible={this.state.visible}
            onOk={this.saveForm}
            onCancel={this.cancelForm}
            width={600}
            maskClosable={false}
          >
           <IncreaseConditions flag={this.state.flag} value={this.state.value}
                               display={this.state.display}
                               changeStatus={display =>this.changeStatus(display)}
                               ConditionalData={this.state.ConditionalData} />
          </Modal>
        </span>
      </div>

    );
  }
}
const  advancedQueryViewer =Form.create()(AdvancedQueryViewer)
export default advancedQueryViewer;
