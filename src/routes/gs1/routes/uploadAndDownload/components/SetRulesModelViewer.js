/**
 * Created by admin on 2017/7/26.
 */
import React from 'react';
import { Form,Select,Modal,Icon,Button,Table,notification,InputNumber } from 'antd';
import ModelViewerNewProcessor from './ModelViewerNewProcessor';
import SetRulesModelProcessor from './SetRulesModelProcessor';
import {connect} from 'react-redux';
const data=[];
const Option = Select.Option;
const  processor=new ModelViewerNewProcessor();
const  pro=new SetRulesModelProcessor();
const openNotificationWithIcon = (type, msg) => {
  notification[type]({
    message: '通知消息',
    description: msg,
    placement: 'bottomRight'
  });
};
const count =0;
class SetRulesModelViewer extends React.Component {
  state={
    data,
    calcuType:[],
    sourceCode:[],
    targetCode:[],
    visible: false,
    thisRow:'',
    formMap:'',
    value:[],
    count,
    dataArr:[],
  }
  componentWillMount() {
    //获的运算符下拉
    processor.getCalcuType(data => {
      //下面的就是请求来的数据
      var result = data.getSinglePrimaryList();
      this.setState({
        calcuType:result
      })
    });
    //获的租户字段下拉
    processor.getSourceCode(data => {
      //下面的就是请求来的数据
      var result = data.getSinglePrimaryList();
      this.setState({
        sourceCode:result
      })
    });
  }
  //渲染租户字段下拉
  drawSourceCode() {
    const children = [];
    for (let i = 0; i < this.state.sourceCode.length; i++) {
      var obj = this.state.sourceCode[i];
      children.push(<Option key={obj.codeValue}>{obj.codeName}</Option>);
    }
    return children;
  }
  //渲染运算符下拉
  drawRelShip() {
    const children = [];
    for (let i = 0; i < this.state.calcuType.length; i++) {
      var obj = this.state.calcuType[i];
      children.push(<Option key={obj.codeValue}>{obj.codeName}</Option>);
    }
    return children;
  }
  //获得object长度
  countProperties= (obj) => {
    var count = 0;
    for (var property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        count++;
      }
    }
    return count;
  }
  //判断是否重复
  REPEAT=(arr)=>{
    var nary=arr.sort();
    for(var i=0;i<arr.length;i++){
      if (nary[i]===nary[i+1]){
        return true;
      }
    }
  }
  //提交
  handleOk = (e) => {
    var sourceCodeArr=[];
    var countWeight=0.0;
    const {data}=this.state;
    for(var i=0;i<data.length;i++) {
      if(data[i].sourceCode==''&&data[i].calcuType==''&&data[i].weight==''){
        openNotificationWithIcon('warning', '请检查是否填完!');
        return;
      }else{
        sourceCodeArr.push(data[i].sourceCode)
        countWeight+=data[i].weight;
      }
    }
    if(data.length===0){
      openNotificationWithIcon('warning', '请添加规则!');
      return ;
    }else if(countWeight>1.0||countWeight<1.0){
      openNotificationWithIcon('warning', '权重之和只能等于1!');
      return ;
    }else if(this.REPEAT(sourceCodeArr)){
      openNotificationWithIcon('warning', '请检查不能重复添加!');
      return;
    }else{
      console.log(data)
      var submitId=this.props.row.submitId;
      pro.saveRule(submitId,data,this.props);
      openNotificationWithIcon('success', '保存成功!');
      this.setState({
        visible: false
      });
    }
    // e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //       var sourceCodeArr=[]
    //       var num=0;
    //       var countWeight=0.0;
    //       var row={};
    //       for(const key of Object.keys(values)) {
    //           num++;
    //           if(num==1){
    //             let sourceCode= JSON.stringify("sourceCode")
    //             let code =JSON.stringify({sourceCode:values[key]});
    //             row+=code.substr(0,code.length-1)+",";
    //             sourceCodeArr.push(values[key])
    //           }else if(num==2){
    //             let calcuType= JSON.stringify("calcuType")
    //             let code =JSON.stringify({calcuType:values[key]});
    //             row+=code.substr(1,code.length-2)+",";
    //           }else{
    //             let weight= JSON.stringify("weight")
    //             let code =JSON.stringify({weight:values[key]});
    //             row+=code.substr(1,code.length-1)+",";
    //             countWeight+=values[key];
    //             num=0;
    //           }
    //       }
    //       var rowCount =this.countProperties(row)
    //       if(rowCount==0){
    //         openNotificationWithIcon('warning', '请添加规则!');
    //         return ;
    //       }else if(countWeight>1.0||countWeight<1.0){
    //         openNotificationWithIcon('warning', '权重之和只能等于1!');
    //         return ;
    //       }else if(this.REPEAT(sourceCodeArr)){
    //         openNotificationWithIcon('warning', '请检查不能重复添加!');
    //         return;
    //       }else{
    //           var last=row.substring(15,row.length-1);
    //           var submitId=this.props.row.submitId;
    //           pro.saveRule(submitId,last,this.props);
    //           openNotificationWithIcon('success', '保存成功!');
    //           this.setState({
    //             visible: false
    //           });
    //       }
    //   }else{
    //     openNotificationWithIcon('warning', '请检查是否填完!');
    //   }
    // });
  }
  //关闭
  handleCancel = () => {
    this.setState({
      visible: false
    });
  }
  //添加
  addApi=()=> {
    const {  data } = this.state;
    const newData = {
      key: data.length+1,
      sourceCode: ``,
      calcuType:``,
      weight:``,
    };
    this.setState({
      data: [...data, newData],
      count: data.length + 1,
    });
  }
  //删除
  removeApi=(text, record, idx)=> {
    const dataSource = [...this.state.data];
    dataSource.splice(idx, 1);
    this.setState({data: dataSource });
  }
  //展示Model框,加载数据
  showModel=(row)=>{
    var submitId=this.props.row.submitId;
    processor.loadRule(this,submitId);
    this.state.data=this.state.dataArr;
    this.setState({
      visible: true,
      thisRow:row,
    });
  }
  calcuTypeOnchange=(value,idx)=> {
    this.state.data[idx].calcuType = value;
    this.setState({
      visible: true,
    })
  }
  sourceCodeOnchange=(value,idx)=> {
    this.state.data[idx].sourceCode = value;
    this.setState({
      visible: true,
    })
  }
  //规则权重
  weightOnchange=(value,idx)=> {
    this.state.data[idx].weight = value;
    this.setState({
      visible: true,
    })
  }
  render() {
    const {getFieldProps} = this.props.form
    const childrenRelShip = this.drawRelShip();
    const childrenSourceCode = this.drawSourceCode();
    const columns = [
      // {
      //   title: '序号',
      //   dataIndex: 'key',
      //   key: 'key',
      //   className:"column-money",
      //   render: (text, record, index) =>index+1,
      //   width:32,
      //   fixed: 'left',
      // },
      {
      title: '对比字段',
      dataIndex: 'sourceCode',
      key: 'sourceCode',
      className:'column-money',
      width:300,
        render: (value, item, idx) => (
          <Select {...getFieldProps(`sourceCode${idx}`, {
            rules: [{ required: true, message: 'Please input your Password!' }],
            initialValue: value
          })} style={{width: 120}}  onChange={(value)=>this.sourceCodeOnchange(value,idx)}>
            {childrenSourceCode}
          </Select>
        ),
      }, {
        title: '匹配算法',
        dataIndex: 'calcuType',
        key: 'calcuType',
        className:'column-money',
        width:300,
        render: (value, item, idx) => (
          <Select {...getFieldProps(`calcuType${idx}`, {
            rules: [{ required: true, message: 'Please input your Password!' }],
            initialValue: value
          })} style={{width: 120}} onChange={(value)=>this.calcuTypeOnchange(value,idx)}>
            {childrenRelShip}
          </Select>
        ),
      }, {
      title: '规则权重',
      dataIndex: 'weight',
      key: 'weight',
      className:'column-money',
      width:300,
      render: (value, item, idx) => (
        <InputNumber {...getFieldProps(`weight${idx}`, {
          rules: [{ required: true, message: 'Please input your Password!' }],
          initialValue: value
        })} style={{width: 110}} min={0.01} max={1} step={0.01}  onChange={(value)=>this.weightOnchange(value,idx)} />
      ),
      }, {
      title: <a onClick={this.addApi}><Icon type="plus" /></a>, key: 'operate',
        render: (text, record, idx) => <a onClick={ _ => this.removeApi(text, record, idx)}><Icon type="minus" /></a>},
    ]
    return(
      <span>
         <Button size="small"  disabled={this.props.row.status==='1'?true:false}  type="primary" onClick={() => this.showModel(this.props.row)}>
           {/*{this.props.row.status=='1'? `检查中`:`设置检查规则`}*/}
           设置检查规则
         </Button>
        <Modal
          visible={this.state.visible}
          title="设置检查规则"
          maskClosable={false}
          style={{ marginLeft: '30%',marginTop: -20}}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" size="large" onClick={this.handleCancel}>关闭</Button>,
            <Button key="submit" type="primary" size="large"  onClick={this.handleOk}>保存</Button>,
          ]}
        >
          {/*<span>*/}
            {/*提示：权重之和必须等于1，不能重复添加对比字段！！！*/}
          {/*</span>*/}
          <Form layout="inline" >
            <Table rowKey="ruleId" bordered dataSource={this.state.data} columns={columns} pagination={false}/>
          </Form>
        </Modal>
      </span>
    )
  }
}
SetRulesModelViewer=Form.create()(SetRulesModelViewer);
const mapStateToProps = (store, ownProps) => {
  return {
    condition:store.RuleReducer.condition
  }
};
export default connect(
  mapStateToProps
)(SetRulesModelViewer);




