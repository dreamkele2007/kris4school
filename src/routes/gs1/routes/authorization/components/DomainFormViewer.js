/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Form,Button,Popconfirm,notification} from 'antd';
import 'antd/dist/antd.css';
import DomainFormProcessor from './DomainFormProcessor';
import SynchronizationProcessor from './SynchronizationProcessor';
const openNotificationWithIcon = (type, msg) => {
  notification[type]({
    message: '通知消息',
    description: msg,
    placement: 'bottomRight'
  });
};
const sprocessor = new SynchronizationProcessor();
const pagination=[];
const processor = new DomainFormProcessor();
class DomainFormViewer extends React.Component {

  state = {
    pagination,
};

  EnableApiIsStop = ()=> {
    if(this.props.selectedRowKeys.length>0){
          var selectedRowsData=this.props.selectedRows;
          var flag=true;
          for (var j=0;j<selectedRowsData.length;j++){
                    if(selectedRowsData[j].isStop=="启用"){
                      flag=false;
                      break;
                    }
          }
            if(flag){
             processor.updateDomainIsStop({total:0,pageSize:10,current:1,defaultCurrent:1},selectedRowsData,this.props,data=>{
               sprocessor.likeQueryDomain({total: 0, pageSize:10, current: 0, defaultCurrent: 0}, '', this.props);
               openNotificationWithIcon('success','启用成功');
             });

          }else {openNotificationWithIcon('error','已启用请勿重复启用'); }
       }else{
      openNotificationWithIcon('error','请选择一条数据');
    }
    };
  DisableApiIsStop = ()=> {
    if(this.props.selectedRowKeys.length >0){
      var selectedRowsData=this.props.selectedRows;
    var flag=true;
    for (var j=0;j<selectedRowsData.length;j++){
      if(selectedRowsData[j].isStop=="停用"){
        flag=false;
        break;
      }
    }
    if(flag){
      processor.updateDomainIsStop({total:0,pageSize:10,current:1,defaultCurrent:1}, selectedRowsData,this.props,data=>{
        sprocessor.likeQueryDomain({total: 0, pageSize:10, current: 0, defaultCurrent: 0}, '', this.props);
        openNotificationWithIcon('success','停用成功');
      });

    }else {openNotificationWithIcon('error','已停用请勿重复停用'); }
    }else{
      openNotificationWithIcon('error','请选择一条数据');
    }
  };
render() {
  return (
    <div style={{float:'right'}}>
      <Popconfirm title="确定启用吗?"  onConfirm={() => this.EnableApiIsStop()}>
       <Button type="primary"  disabled={this.props.data.length==0?true:false} >启用</Button>
      </Popconfirm>&nbsp;
       <Popconfirm title="确定停用吗?" onConfirm={() => this.DisableApiIsStop()}>
       <Button type="primary" disabled={this.props.data.length==0?true:false}>停用</Button>
      </Popconfirm>&nbsp;
    </div>
);
}
}
const  domainFormViewer=Form.create()(DomainFormViewer);
export default domainFormViewer;
