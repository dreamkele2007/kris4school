/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Form,Button,Menu,Dropdown,Modal} from 'antd';
import 'antd/dist/antd.css';
import AdvancedQueryProcessor from './AdvancedQueryProcessor';
import AddMenuModelViewer from './AddMenuModelViewer';
import IncreaseConditions from './IncreaseConditions';
const processor=new AdvancedQueryProcessor();
class AdvancedQueryViewer extends React.Component {
  state = {
    data:[],
    form:[],
    ConditionalData: [],
    visible: false,
    visible1: false,
    flag:true,
    display:'none',
    value:[]
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
          <a  onClick={()=>{this.quickQuery('all')}}>全部</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div style={{float:'right'}} >
        <Dropdown  overlay={menu} trigger={['click']}>
          <Button type="primary" >快速查询</Button>
        </Dropdown>
        &nbsp;
        <Button type="primary"   onClick={this.onRowClick}>高级查询</Button>&nbsp;
        <AddMenuModelViewer selectedRowKeys={this.props.selectedRowKeys} selectedRows={this.props.selectedRows}
                            dispatch={this.props.dispatch}
        />
        <Modal
          title="高级查询"
          maskClosable={false}
          visible={this.state.visible}
          onOk={this.saveForm}
          onCancel={this.cancelForm}
          width={600}
          okText="保存"
        >
         <IncreaseConditions value={this.state.value}
                             display={this.state.display}
                             changeStatus={display =>this.changeStatus(display)}
                             ConditionalData={this.state.ConditionalData} />
        </Modal>
      </div>
    );
  }
}
const  advancedQueryViewer =Form.create()(AdvancedQueryViewer)
export default advancedQueryViewer;
