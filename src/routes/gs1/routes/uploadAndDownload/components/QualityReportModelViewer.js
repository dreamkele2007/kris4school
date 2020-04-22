/**
 * Created by admin on 2017/7/26.
 */
import React from 'react';
import { Modal,Button} from 'antd';
import  QualityReportModelProcessor from './QualityReportModelProcessor';
import ReactEcharts from'./ReactECharts/index';

const processor=new QualityReportModelProcessor();
const eChartsData=[];
class QualityReportModelViewer extends React.Component {
  state={
    visible: false,
    thisRow:'',
    ruleString:'',
    states:true,
    eChartsData,
  }
  handleCancel = () => {
    this.setState({
      visible: false
    });
  }
  reportModel=(row)=>{
    var submitId = this.props.row.submitId;
    //匹配规则字符串
    processor.getRuleString(submitId,this)
    this.setState({
      visible: true,
      thisRow:row,
    });
    //报表的数据
    processor.eChartsData(submitId,this)
    // if(status=='2'||status=='3'){
    //   this.setState({
    //     states:false,
    //   })
    // }
  }
  render() {
    const option = {
      title: {
        text: '匹配度条数情况分析',
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter : '匹配度:{b}<br/>{a0}:{c0}条<br/>'
      },
      legend: {
        data:['匹配条数'],
      },
      toolbox: {
        show : true,
        feature : {
          mark : {show: true},
          dataView : {show: true, readOnly: false},
          magicType : {show: true, type: ['line', 'bar']},
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      // grid: { // 控制图的大小，调整下面这些值就可以，
      //   x:40,
      // },
      calculable : true,
      xAxis : [
        {
          type : 'category',
          barCategoryGap: '60%',
          name: '%',
          data :['100','90-99','80-89','70-79','60-69','50-59'],
          axisLabel:{
            interval:0,//横轴信息全部显示
            // rotate:-30,//-30度角倾斜显示
          }
        }
      ],
      yAxis : [
        {
          type: 'value',
          minInterval : 1,
          name: '条',
          axisLabel: {
            // formatter: '{value}条'
          }
        }
      ],
      series : [
        {
          name:'匹配条数',
          type:'bar',
          data : this.state.eChartsData
        }
      ]
    };
    return (
      <span>
        <Button size="small" disabled={this.props.row.status==='2'||this.props.row.status==='3'? false:true}  type="primary"  onClick={() => this.reportModel(this.props.row)}>
          检查报告
        </Button>
        <Modal
          title="质量报告"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          maskClosable={false}
          style={{ marginLeft: '30%',marginTop: -70}}
          footer={[
          <Button key="back" size="large" type="primary" onClick={this.handleCancel}>关闭</Button>,
          ]}
        >
            <p style={{marginLeft:-35,fontSize:15,height:10,marginTop:-20}}>文件名：
              {this.state.thisRow.fileUrl==null?null:this.state.thisRow.fileUrl.substring(59,this.state.thisRow.fileUrl.length)}</p>
            <p style={{marginLeft:-35,fontSize:15,height:10}}>上传日期：
              {new Date(parseInt(this.state.thisRow.submitTime) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")}</p>
            <p style={{marginLeft:-35,fontSize:15,height:10}}>上传总条数：{this.state.thisRow.totalNum}</p>
            <p style={{marginLeft:-35,fontSize:15,height:10}}>匹配规则：
              {this.state.ruleString==null?"无匹配规则":this.state.ruleString}</p>
            <p style={{marginLeft:-35,fontSize:15,height:10,marginTop:50}}>执行日期：
              {this.state.thisRow.lastMatchTime==null? "暂无执行" : new Date(parseInt(this.state.thisRow.lastMatchTime) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")}</p>
            <p style={{marginLeft:-35,fontSize:15,height:10}}>匹配度为100%的数据条数为：{this.state.eChartsData[0]}条</p>
            <p style={{marginLeft:-35,fontSize:15,height:10}}>匹配度在90%-99%的数据条数为：{this.state.eChartsData[1]}条</p>
            <p style={{marginLeft:-35,fontSize:15,height:10}}>匹配度在80%-89%的数据条数为：{this.state.eChartsData[2]}条</p>
            <p style={{marginLeft:-35,fontSize:15,height:10}}>匹配度在70%-79%的数据条数为：{this.state.eChartsData[3]}条</p>
            <p style={{marginLeft:-35,fontSize:15,height:10}}>匹配度在60%-69%的数据条数为：{this.state.eChartsData[4]}条</p>
            <p style={{marginLeft:-35,fontSize:15,height:10}}>匹配度在50%-59%的数据条数为：{this.state.eChartsData[5]}条</p>
          <div className="card-block" >
             <ReactEcharts style={{height:'200px'}} option={option}  showLoading={false} />
          </div>
          <p style={{marginLeft:-35,fontSize:15,height:10}}>
            稽核结果见报告
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/*disabled={this.props.row.status=='3'? false:true}*/}
            <Button size="default"  type="primary"    icon="download">
              {/*{this.props.row.status=='3'?   // : `未稽核完不能生成报告` // }*/ }
              <a  href={`http://127.0.0.1:8888/api/download/downloadReport/`+this.state.thisRow.submitId} style={{ fontSize: 12, color: '#ffffff' }} >
                &nbsp;下载报告Excel
              </a>

            </Button>
          </p>
        </Modal>
      </span>
    )
  }
}
export  default QualityReportModelViewer;
