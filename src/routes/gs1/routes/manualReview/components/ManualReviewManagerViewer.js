/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import {Form,notification,Tabs} from 'antd';
import 'antd/dist/antd.css';
import './form.css';
import './tabs.css';
import {connect} from 'react-redux';
import TabsOneViewer from './TabsOneViewer';
import TabsTwoViewer from './TabsTwoViewer';
import ManualReviewManagerProcessor from './ManualReviewManagerProcessor';
import SearchFromProcessor from './SearchFromProcessor';
import  ManualForm from './ManualForm';
const TabPane = Tabs.TabPane;
const processor=new ManualReviewManagerProcessor();
class ManualReviewManagerViewer extends React.Component {
  state = {
    visible: false,
    domainValue:[],
    nullValue:[],
    selectedRowKeys:[],
    selectedRows:[],
    submitId:'',
    name:'',
    status:'searchArithmetic',
    dis:'none',
    menuName:[],
    notAudited:[],
    haveAudit:[],
    notAuditedNumArr:[],
    haveAuditNumArr:[],
  };
  componentWillMount() {
    var submitId=this.getUrlParam('p');
    this.setState({
      submitId: submitId,
      dataSource:[],
      name:'notAudited',
    });
    //获得未稽核
    processor.getCount(submitId,"notAudited",data => {
      var dc = data;
      const arr=[]
      var count=dc.parameters.result;
      arr.unshift(count);
      this.setState({
        notAuditedNumArr:arr,
      });
    });
    //获得已稽核
    processor.getCount(submitId,"haveAudit",data => {
      var dc = data;
      const arr=[]
      var count=dc.parameters.result;
      arr.unshift(count);
      this.setState({
        haveAuditNumArr:arr,
      });
    });
  }
  componentWillReceiveProps(newProps) {
    if(newProps!=null&&newProps.condition!=null) {
      processor.formChange(null,newProps.condition,this);
    }
  };
  // 获取url后面参数
  getUrlParam=(name)=> {
    var reg = new RegExp("[?&]" + name + "=([^?&]*)[&]?", "i");
    var match = this.props.location.search.match(reg);
    return match == null ? "" : match[1];
  }
  //未稽核
  notAudited=(key)=>{
    if(key===`1`){
      var name=this.state.name
      if(name!=="notAudited"){
        this.setState({
          selectedRowKeys:[],
          selectedRows:[]
        })
      }
      var  submitId=this.state.submitId;
      this.state.name='notAudited';
      processor.loadData(this,null,submitId,this.state.name)
      //重新查询下面表格
      // processor.getMatchData({total:0,pageSize:10,current:1,defaultCurrent:1},null,this)
      this.setState({
        visible: false,
        dis:'none',
      });
    }else{
      let name=this.state.name
      if(name!=="haveAudit"){
        this.setState({
          selectedRowKeys:[],
          selectedRows:[]
        })
      }
      let submitId=this.state.submitId;
      this.state.name='haveAudit'
      processor.loadData(this,null,submitId,this.state.name)
      //重新查询下面表格
      // processor.getMatchData({total:0,pageSize:10,current:1,defaultCurrent:1},null,this)
      this.setState({
        visible: false,
        dis:'none',
      });
    }
  }
  render() {
    return (
        <div>
          <Tabs  style={{marginTop:-18}} tabPosition="top" type="card" onChange={this.notAudited}>
            <TabPane  style={{align:'center'}} tab={<span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              未稽核({this.state.notAuditedNumArr[0]})
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>} key="1">
                <TabsOneViewer props={this.props}  submitId={this.state.submitId}
                               name={this.state.name} condition={this.props.condition}
                               notAuditedNumArr={this.state.notAuditedNumArr}  haveAuditNumArr={this.state.haveAuditNumArr}
                />
            </TabPane>
            <TabPane tab={<span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              已稽核({this.state.haveAuditNumArr[0]})
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>} key="2">
              <TabsTwoViewer props={this.props}  submitId={this.state.submitId}
                             name={this.state.name} condition={this.props.condition}
                             notAuditedNumArr={this.state.notAuditedNumArr}  haveAuditNumArr={this.state.haveAuditNumArr}
              />
            </TabPane>
          </Tabs>
         </div>
        );
  }
}

ManualReviewManagerViewer=Form.create()(ManualReviewManagerViewer);
const mapStateToProps = (store, ownProps) => {
  return {
    condition:store.GoveQuery.condition
  }
};
export default connect(
  mapStateToProps
)(ManualReviewManagerViewer);
