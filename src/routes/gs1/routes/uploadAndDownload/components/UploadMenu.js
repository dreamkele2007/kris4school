/**
 * Created by admin on 2017/10/16.
 */
import React from 'react';
import { Icon,Button,Upload,notification } from 'antd';
import  UploadAndDownloadManagerProcessor from './UploadAndDownloadManagerProcessor';
const processor=new UploadAndDownloadManagerProcessor()
const openNotificationWithIcon = (type, msg) => {
  notification[type]({
    message: '通知消息',
    description: msg,
    placement: 'bottomRight'
  });
};

class UploadMenu extends React.Component {
  state = {
    url:'http://127.0.0.1:8888/api/download/downloadTemplate',
  }
  handleChange = (info) => {
    if (info.file.status === 'done') {
      let fileList = info.fileList;
      let file = info.file;
      fileList = fileList.slice(0, 1);
      if (file.response.status==='error') {
        openNotificationWithIcon('error', file.name + '上传失败！');
        return ;
      }else{
        let str=file.response.dataCenter.body.parameters.result;
        if('为空'===str){
          openNotificationWithIcon('warning', file.name + '上传失败，不支持上传空文件！');
        }else if('不支持该文件'===str){
          openNotificationWithIcon('warning', file.name + '上传失败，不支持该文件！');
        }else{
          processor.uploadData({total:0,pageSize:10,current:1,defaultCurrent:1},this.props);
          openNotificationWithIcon('success', file.name + '上传成功！');
          let fileName = fileList.fileName;
          this.setState({
            editable: true,
            fileName: fileName,
          });
        }
      }
    }
  }
  render() {
    const props = {
      action: '/api/download/uploadTemplate',
      onChange: this.handleChange,
      multiple: false,
    };
    var dc = new window.DataCenter();
    var ds = new window.DataStore();
    dc.addDataStore("items", ds);
    dc.setParameter("_boId", "uploadPoiServiceImpl");
    dc.setParameter('_methodName', 'uploadPoi');
    dc.setParameter('_methodParameterTypes', 'String');
    dc.setParameter("_parameters", "id");
    dc.setParameter("id","001");
    const {url} = this.state;
    return(
      <div>
        <Button size="default" type="primary" icon="download"><a href={url} style={{ fontSize: 12, color: '#fffbf7' }} >&nbsp;下载模板</a></Button>
        &nbsp;
        <Upload {...props}   data={{"data":dc.toBase64Json()}} after="center">
          <Button  size="default"  type="primary">
            <a href="javascript:void(0)">
              <Icon type="upload" /> 上传资料
            </a>
          </Button>
        </Upload>
      </div>
    )
  }
}

export default UploadMenu;
