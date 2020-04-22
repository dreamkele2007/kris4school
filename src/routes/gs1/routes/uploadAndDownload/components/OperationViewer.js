/**
 * Created by admin on 2017/7/26.
 */
import React from 'react';
import { Popconfirm,Button,notification } from 'antd';
import { NavLink as Link } from 'react-router-dom'
import SetRulesModelViewer from './SetRulesModelViewer';
import QualityReportModelViewer from './QualityReportModelViewer';
import OperationProcessor from './OperationProcessor';
const processor=new OperationProcessor();
const openNotificationWithIcon = (type, msg) => {
  notification[type]({
    message: '通知消息',
    description: msg,
    placement: 'bottomRight'
  });
};
class OperationViewer extends React.Component {
  state={
    visible: false,
  }
  //执行检查
  performInspection=(record)=>{
    var submitId=record.submitId;
      processor.performInspectionNow(submitId,data =>{
        if (data.header.code === 1) {
          processor.findDomainSubmitData(this.props)
          //修改加载中状态值
         this.props.changeLoading(true);
          processor.performInspection(submitId,data =>{
            if (data.header.code === 1) {
              //修改加载中状态值
              this.props.changeLoading(false);
              processor.findDomainSubmitData(this.props)
              openNotificationWithIcon('success', '执行成功!');
            } else {
              openNotificationWithIcon('error', '执行失败!');
            }
          });
        } else {
          openNotificationWithIcon('error', '正在执行失败!');
        }
      });
  }
  render() {
    return (
      <span>
        <SetRulesModelViewer dispatch={this.props.dispatch} row={this.props.record} />
        &nbsp;&nbsp;
        <Popconfirm title={this.props.record.status==='0'? "确定执行检查?":"确定覆盖上次检查?"} onConfirm={() => this.performInspection(this.props.record)}>
           <Button    disabled={this.props.record.status==='1'||this.props.record.status==='3'? true:false} type="primary" size="small"  >
             执行检查
           </Button>
        </Popconfirm>
        &nbsp;&nbsp;
        <Button size="small" disabled={this.props.record.status==='2'||this.props.record.status==='3'? false : true}  type="primary">
          <Link to={`/gs1/newDataGovernance/ManualReviewManagerViewer?p=`+this.props.record.submitId} >
            稽核
          </Link>
        </Button>
        &nbsp;&nbsp;
        <QualityReportModelViewer dispatch={this.props.dispatch} row={this.props.record} />
      </span>
    )
  }
}

export  default  OperationViewer;
