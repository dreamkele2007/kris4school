import React from 'react'
import {Input, Button, Row, Col, Collapse,Table,Popconfirm,notification} from 'antd';
import './style.css'
import PropTypes from 'prop-types'
import Dragger from './Dragger'
import { NavLink as Link } from 'react-router-dom'
import { Menu, Icon,Layout,Checkbox } from 'antd';
import {connect} from 'react-redux';
import appProcessor from './AppProcessor'
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const CheckboxGroup = Checkbox.Group;
const Panel = Collapse.Panel;
const processor = new appProcessor();
export default class LayoutDemo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      message: 'Allo!',
      tableList:[],
      draggerTable:[],
      coulmnList:[],
    }
    // this.tick = this.tick.bind(this);
  }
    state = {
        x: 0,
        y: 0,
    }
  //选中框选中
  onChangeValue=(value)=>{
  }
  onDrag(e, x, y) {
    this.setState({
        x: x, y: y
    })
  }
  componentWillMount() {
      //发送请求查询菜单
    processor.queryTableList(data=>{
      var result = data.getSinglePrimaryList();
      this.setState({
        tableList:result
      })
    })
  }
  deleteTable(tableName){
    var arr = this.state.draggerTable;
    for(var i =0; i<this.state.draggerTable.length;i++){
      if(this.state.draggerTable[i].key==tableName){
        arr.splice(i,1);
        break;
      }
    }
    this.setState({
      draggerTable:arr
    })
  }
  getTableInfo(tableName){

    const options = [];
    processor.queryCoulmnListList(tableName,data=>{
      var result = data.getSinglePrimaryList();
      for (let i = 0; i <  result.length; i++) {
        var obj =  result[i];
        options.push(obj.columnName);
      }
      var arr =this.state.draggerTable;
      arr.push(
        <Dragger bounds='parent' key={tableName}  onMove={this.onDrag.bind(this)}  style={{ zIndex: 6,maxHeight:100 }} >
          <Collapse  bordered={true} style={{width: 200}} defaultActiveKey={['1']}>
            <Panel  header={
              <span
                title={tableName}>
                {tableName.length>18?tableName.substring(0,18)+'...':tableName}
                  <div  style={{float:'right'}} onClick={this.deleteTable.bind(this,tableName)}>
                    <Icon style={{marginRight:10}} type="close" />
                  </div>
              </span>
            }   key="1" >
             <div  style={{maxHeight:200,overflowY:'auto',paddingRight:0,overflowX:'hidden'}}>
              <CheckboxGroup options={options} title={options} onChange={this.onChangeValue} />
               </div>
            </Panel>
          </Collapse>
        </Dragger>
      );
      this.setState({
        draggerTable:arr
      });
    })

  }
  drawTaskTypes() {
    const children = [];
    for (let i = 0; i < this.state.tableList.length; i++) {
      var obj = this.state.tableList[i];
      children.push(<Menu.Item title={obj.tableName} key={obj.tableName} >
        <span onClick={this.getTableInfo.bind(this,obj.tableName)}>{obj.tableName}</span></Menu.Item>);
    }
    return children;
  }
  drawTable(){
    var {draggerTable} = this.state;
    return draggerTable;
  }
    render() {
      let drawTable = this.drawTable();
      let childrenTaskTypes = this.drawTaskTypes();
        return (
        <div>
          <Layout style={{marginTop:-23}}>
            <Sider style={{background: 'white',maxHeight:540,overflowX:'hidden'}} width={240}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" style={{paddingLeft:'16px !important'}} title={<span><Icon type="database" />gs1</span>}>
                  {childrenTaskTypes}
                </SubMenu>
              </Menu>
            </Sider>
             <div className='bounds' style={{borderLeft:'1px solid rgba(120, 120, 120, 0.4)',
                                    left:510,width:'61%',height:'82%',position:'absolute',overflowY:'aoto'}}>
               {drawTable}
             </div>
          </Layout>
        </div>

        )
    }

}
