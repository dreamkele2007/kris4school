/**
 * Created by hp on 2017/6/15.
 */
import 'antd/dist/antd.css';
import {documentDistributeAction} from '../../../models/actions/documentDistribute/documentDistributeAction';
import HttpUtil from '../../../../../constants/httpUtil';

class documentDistributeModelProcessor {

  // 修改任务
  addOrUpdateTask(data,value,getDataSuccess) {
    // const {dispatch} = props;
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.Task");
    ds.setRowSetName("com.viewhigh.vhgs1.entity.Task");
    var crontab = value.second.toString()+' '+value.mini.toString()+' '+value.hour.toString()+' '+
      value.day.toString()+' '+value.month.toString()+' '+value.week.toString();
    data.crontab = crontab
    data.taskName = value.taskName;
    data.taskType = value.taskType;
    var rowSet = new window.RowSet([data]);
    ds.setRowSet(rowSet);
    dc.addDataStore("task",ds);
    dc.setParameter("_boId", "taskServiceImpl");
    dc.setParameter('_methodName', 'addOrUpdateTask');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.Task');
    dc.setParameter("_parameters","task");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getDataSuccess);
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

  // 任务进度下拉
  findStatus(props, getUserListSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "taskServiceImpl");
    dc.setParameter('_methodName', 'keepProcessor');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getUserListSuccess);
  }

  flagNum(result, props) {
    var dispath = props.dispatch;
    dispath(documentDistributeAction({
      condition: [result, 'timer']
    }));
  }
}
export default documentDistributeModelProcessor;
