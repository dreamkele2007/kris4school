/**
 * Created by hp on 2017/6/15.
 */
import React from 'react';
import { Form,Button,Popconfirm,notification} from 'antd';
import 'antd/dist/antd.css';
import ReAuthorizeProcessor from './ReAuthorizeProcessor';
import SynchronizationProcessor from './SynchronizationProcessor';
const pagination=[];
const data=[];
const processor = new ReAuthorizeProcessor();
const sprocessor = new SynchronizationProcessor();
const openNotificationWithIcon = (type, msg) => {
  notification[type]({
    message: '通知消息',
    description: msg,
    placement: 'bottomRight'
  });
};
class JurisdictionViewer extends React.Component {
  state = {
    data,
    pagination,
  };
  ReAuthorizeDomainPower = () => {
    if(this.props.selectedRowKeysJur.length>0){
      processor.ReAuthorizeDomainPower({total: 0, pageSize: 10, current: 0, defaultCurrent: 0}, this.props.selectedRows,this.props,data=>{
        sprocessor.likeQueryDomain({total: 0, pageSize:10, current: 0, defaultCurrent: 0}, '', this.props);
        openNotificationWithIcon('success', '生成token成功!');
      });
    }else{ openNotificationWithIcon('error','请选中一条数据');}
  };
    render() {
      return (
        <div style={{float:'right'}}>
          <Popconfirm title="确定生成token吗?" onConfirm={() => this.ReAuthorizeDomainPower()}>
             <Button type="primary" disabled={this.props.data.length===0?true:false}>生成token</Button>
          </Popconfirm>&nbsp;
        </div>
      );
    }
  }
const  jurisdictionViewer=Form.create()(JurisdictionViewer);
export default jurisdictionViewer;
