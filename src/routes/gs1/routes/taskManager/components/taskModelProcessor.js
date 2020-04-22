/**
 * Created by hp on 2017/6/15.
 */
import 'antd/dist/antd.css';
import HttpUtil from '../../../../../constants/httpUtil';
import ModelMsgBox from '../../../../../constants/ModelMsgBox.js';

class taskManagerProcessor {

  // 新增任务/更新任务
  addOrUpdateTask(data,value,getDataSuccess) {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.Task");
    var crontab = value.second.toString()+' '+value.mini.toString()+' '+value.hour.toString()+' '+
                  value.day.toString()+' '+value.month.toString()+' '+value.week.toString();
    if (data){
      data.crontab = crontab
      data.taskName = value.taskName;
      data.taskType = value.taskType;
      // var rowSet = new window.RowSet([data]);
    }else {
      value.crontab = crontab;
      data = value;
      // var rowSet = new window.RowSet([value]);
    }
    var rowSet = new window.RowSet([data]);
    ds.setRowSet(rowSet);
    dc.addDataStore("task",ds);
    dc.setParameter("_boId", "taskServiceImpl");
    dc.setParameter('_methodName', 'addOrUpdateTask');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.Task');
    dc.setParameter("_parameters","task");
    //post请求
    // HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
    //   //下面的就是请求来的数据
    //   var dc=data;
    //   var ds=dc.getSingleDataStore();
    //   console.log(dc.getSingleDataStore());
    //   // viewer.setState({
    //   //   data: dc.getSinglePrimary(),
    //   //   pagination:{total:ds.getRecordCount(),current:ds.getPageNumber(),defaultCurrent:1}
    //   // });
    // },function(data){
    //   debugger
    //   ModelMsgBox.ErrorMsg('错误','1');
    // });
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getDataSuccess);
  }

  // 删除任务
  deleteTask(dataList,getDataSuccess) {
    var dc = new window.DataCenter();
    var ds = new window.DataStore(dataList);
    ds.setRowSetName("com.viewhigh.vhgs1.entity.Task");
    var rowSet = new window.RowSet(dataList);
    ds.setRowSet(rowSet);
    dc.setParameter("_boId", "taskServiceImpl");
    dc.setParameter('_methodName', 'deleteTask');
    dc.setParameter('_methodParameterTypes', 'java.util.List<com.viewhigh.vhgs1.entity.Task>');
    dc.setParameter("_parameters", "taskList");
    dc.addDataStore("taskList", ds);
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getDataSuccess)
  }


  // 启用
  startTask(dataList,getDataSuccess) {
    var dc = new window.DataCenter();
    var ds = new window.DataStore();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.Task");
    var rowSet = new window.RowSet(dataList);
    ds.setRowSet(rowSet);
    dc.addDataStore("taskList",ds);
    dc.setParameter("_boId", "taskServiceImpl");
    dc.setParameter('_methodName', 'startTask');
    dc.setParameter('_methodParameterTypes', 'java.util.List<com.viewhigh.vhgs1.entity.Task>');
    dc.setParameter("_parameters","taskList");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,getDataSuccess);
  }

  // 停用
  stopTask(dataList,getDataSuccess) {
    var dc = new window.DataCenter();
    var ds = new window.DataStore(dataList);
    ds.setRowSetName("com.viewhigh.vhgs1.entity.Task");
    var rowSet = new window.RowSet(dataList);
    ds.setRowSet(rowSet);
    dc.addDataStore("taskList",ds);
    dc.setParameter("_boId", "taskServiceImpl");
    dc.setParameter('_methodName', 'stopTask');
    dc.setParameter('_methodParameterTypes', 'java.util.List<com.viewhigh.vhgs1.entity.Task>');
    dc.setParameter("_parameters","taskList");
    // post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,getDataSuccess);
  }

  // 手动执行
  manualRun(data,getDataSuccess) {
    var dc = new window.DataCenter();
    var ds = new window.DataStore();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.Task");
    var rowSet = new window.RowSet([{
      "taskId": data.taskId,
      "taskName": data.taskName,
      "isRun": data.isRun,
      'crontab':data.crontab,
      'taskType':data.taskType
    }]);
    ds.setRowSet(rowSet);
    dc.addDataStore("task",ds);
    dc.setParameter("_boId", "taskServiceImpl");
    dc.setParameter('_methodName', 'manualRunTask');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.Task');
    dc.setParameter("_parameters","task");
    // post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,getDataSuccess);
  }

}
export default taskManagerProcessor;
