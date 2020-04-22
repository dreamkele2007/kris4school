/**
 * Created by hp on 2017/6/15.
 */
import 'antd/dist/antd.css';
import HttpUtil from '../../../../../constants/httpUtil';
import {taskAction} from '../../../models/actions/taskManager/taskAction';
class taskManagerProcessor {
  // 查询/分页查询
  handleTableChange(pagination,props) {
    var dc = new window.DataCenter();
    var ds = new window.DataStore();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.Task");
    var rowSet = new window.RowSet([{
      "taskType": ''
    }]);
    ds.setRowSet(rowSet);
    dc.addDataStore("task", ds);
    dc.setParameter("_boId", "taskServiceImpl");
    dc.setParameter('_methodName', 'getTaskByCondition');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.Task');
    dc.setParameter("_parameters", "task");
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    const {dispatch} = props;
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      dispatch(taskAction(data))
    });
  };

  // 查询后台任务状态信息
  queryTaskStatu(getTaskStatuListSuccess){
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "taskServiceImpl");
    dc.setParameter('_methodName', 'keepRenewProcessor');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getTaskStatuListSuccess);
  }

  // 查询任务类型
  queryDictTypeList(getUserListSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "codeDictDataServiceImpl");
    dc.setParameter('_methodName', 'getCodeDict');
    dc.setParameter('_methodParameterTypes', 'String');
    dc.setParameter("_parameters", "codeType");
    dc.setParameter("codeType", 'task');
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getUserListSuccess);
  }


  // 查询任务进度下拉
  findStatus(getUserListSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "taskServiceImpl");
    dc.setParameter('_methodName', 'keepProcessor');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getUserListSuccess);
  }

}
export default taskManagerProcessor;
