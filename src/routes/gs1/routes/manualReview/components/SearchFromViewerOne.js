/**
 * Created by admin on 2017/7/26.
 */
import React, {Component} from 'react';
import {Button,Form,Select } from 'antd';
import SearchFromProcessor from './SearchFromProcessor';
const processor=new SearchFromProcessor();
const FormItem = Form.Item;
const Option = Select.Option;
class SearchFromViewer extends Component {
  state ={
    name:this.props.name,
    row:[],
    menu:[],
    submitId:this.props.submitId,
    formValue:this.props.rowKey,
    rowVal:this.props.row,
  }
  componentWillMount() {
    const submitId= this.state.submitId
    //厂商下拉
    processor.getMenuList(submitId,data => {
      //下面的就是请求来的数据
      var result = data.getSinglePrimaryList();
      this.setState({
        menu: result
      })
    });
    processor.loadDataOne({total:0,pageSize:10,current:1,defaultCurrent:1},this.props,submitId,"haveAudit");
  }
  handleSubmit = (e) => {
    e.preventDefault();
    var arr=this.props.rowKey;
    var val=this.props.row;
    val.splice(0, 1);
    arr.splice(0,arr.length);
    this.setState({
      formValue:arr,
      rowVal:val,
    })
    processor.loadDataOne({total:0,pageSize:10,current:1,defaultCurrent:1},this.props,this.state.submitId,"haveAudit");
  }
  //渲染厂商下拉
  drawMenu() {
    const children = [];
    for (let i = 0; i < this.state.menu.length; i++) {
      var obj = this.state.menu[i];
      children.push(<Option key={obj.manuName}>{obj.manuName}</Option>);
    }
    return children;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const childrenMenu = this.drawMenu();
    return (
      <span>
        <Form  layout="inline" onSubmit={this.handleSubmit}>
            {/*<FormItem  label="匹配度">*/}
              {/*{getFieldDecorator('matchDegree', {*/}
              {/*})(*/}
                {/*<Select disabled={true} allowClear style={{width:122}}>*/}
                  {/*<Option value="完全匹配">完全匹配</Option>*/}
                  {/*<Option value="部分匹配">部分匹配</Option>*/}
                  {/*<Option value="不匹配">不匹配</Option>*/}
                {/*</Select>*/}
              {/*)}*/}
            {/*</FormItem>*/}
            <FormItem  label="厂商" style={{marginLeft:10}}>
              {getFieldDecorator('manufacturingPlantName', {
              })(
                <Select mode="combobox" allowClear style={{width:220}}>
                  {childrenMenu}
                </Select>
              )}
            </FormItem>
            <FormItem style={{marginTop:3}}>
              <Button size="default"  type="primary" htmlType="submit">查询</Button>
            </FormItem>
           {/*<FormItem >
             <Button style={{marginTop:-15}}  size="default"  type="primary">
              <Link to={`/gs1/newDataGovernance/UploadAndDownloadManagerViewer`}  >返回</Link>
            </Button>
           </FormItem>*/}
        </Form>
      </span>
    )
  }
}
SearchFromViewer=Form.create()(SearchFromViewer);
export  default  SearchFromViewer;
