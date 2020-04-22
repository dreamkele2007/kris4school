/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Form,Select,Button,Input,Icon,Card,Radio} from 'antd';
import 'antd/dist/antd.css';
import IncreaseConditionsProcessor from './IncreaseConditionsProcessor';

const processor=new IncreaseConditionsProcessor();
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const operatortDropDown = [];
const productDropDown=[];
class IncreaseConditions extends React.Component {
  state = {
    data:[],
    dataSource:[],
    visible: false,
    value:'all',
    radio:this.props.value,
    formValue: this.props.ConditionalData,
    select: 'none',
    operatortDropDown,
    productDropDown,
  };

  componentWillMount(){
    processor.productDropDown(this);
    processor.operatortDropDown(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    var arr =this.state.formValue;

    this.props.form.validateFields((err,values) => {
      arr.push(values);
    });
    this.setState({
      formValue:arr
    });
    this.props.changeStatus('none')
  };
  onChange = (e) => {
    var arr=this.state.radio;
    arr.push(e.target.value);
    this.setState({
      radio:arr,
      value: e.target.value,
    });
  };
  add = () => {
    this.props.form.setFieldsValue({
      "real":null,
      "operator":null,
      "content":null,
    });
    if (this.props.display ==='none') {
      this.props.changeStatus('')
    } else {
      this.props.changeStatus('none')
    }
    if (this.state.select === 'none') {
      this.setState({
        select: ''
      });
    } else {
      this.setState({
        select: 'none'
      });
    }
    if(this.state.operatortDropDown.length<1 && this.state.productDropDown.length<1){
      this.DropDown();
    }

  };
  DropDown=()=>{
    var obj=this.state.data;
    for(var i=0;i<this.state.data.length;i++){
      productDropDown.push(<Option key={obj[i].codeValue}>{obj[i].codeName}</Option>);
    }
    var obj1=this.state.dataSource;
    for(var j=0;j<this.state.data.length;j++){
      operatortDropDown.push(<Option key={obj1[j].codeValue}>{obj1[j].codeName}</Option>);
    }
  };
  render() {
    const {getFieldDecorator} = this.props.form;
    const content = (
      <Form layout="inline" onSubmit={this.handleSubmit} >
        <FormItem
          label="字段"
        >
          {getFieldDecorator('real')(
            <Select style={{width:100}}>
              {productDropDown}
            </Select>
          )}
        </FormItem>
        <FormItem
          label="运算符"
        >
          {getFieldDecorator('operator')(
            <Select style={{width:100}}>
              {operatortDropDown}
            </Select>
          )}
        </FormItem>
        <br/>
        <br/>
        <FormItem
          label="名称"
        >
          {getFieldDecorator('content')(
            <Input style={{width:200}}   maxLength="20"/>
          )}
        </FormItem>
        <FormItem >
          <Button
            type="primary"
            htmlType="submit"
          >
            保存
          </Button>
        </FormItem>
      </Form>
    );
    return (
      <div >
        显示内容&nbsp;&nbsp;&nbsp;
        <RadioGroup onChange={this.onChange} value={this.state.value}>
          <Radio value={"all"}>满足下列所有条件</Radio>
          <Radio value={"or"}>满足下列任意条件</Radio>
        </RadioGroup><br/>
        {this.renderContent(this.state.formValue)}
        <Button type="dashed" onClick={this.add} style={{width: '20%'}}>
          <Icon type="plus"/> 添加筛选条件
        </Button>
        <Card style={{width:500, display: this.props.display}}>
          {content}
        </Card>
      </div>
    );
  }
  deleteFrom=(i)=>{
    for(var j=0;j<this.state.formValue.length;j++){
      var pId=this.state.formValue[j].real;
      var valueId=this.state.formValue[i].real;
      if(pId===valueId){
        this.state.formValue.splice(i,1);
        break;
      }
    }
    this.setState({ visible:false });
  };

  renderContent = (FormValues) => {
    return (
      <span >
        {
          FormValues.map((value, i) => {
            return (
              <span className={'spanCss'} style={{marginLeft:15}}  >
                {this.productName(value.real)}&nbsp;&nbsp;&nbsp;{value.operator}&nbsp;&nbsp;&nbsp;{value.content}<Icon type="close" style={{marginLeft:5}}  onClick={()=>{this.deleteFrom(i)}}/>
              </span>)
          })
        }
     </span>
    )
  };
  productName=(real)=>{
    var name="";
    var data =this.state.data
    for(var i=0;i<data.length;i++){
      if(data[i].codeValue===real){
        name=data[i].codeName;
      }
    }
    return name;
  }
}


const  increaseConditions =Form.create()(IncreaseConditions);
export default increaseConditions;
