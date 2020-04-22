/**
 * Created by admin on 2017/7/7.
 */
import HttpUtil from 'constants/httpUtil';
import  {taskMonitorAction} from '../../../models/actions/taskMonitor/taskMonitorAction';
class taskMonitorFormProcesor {
  // 查询更新记录
  findTaskLog(props,pagination,values){
    const rangeTimeStart = values!=null?values.rangePicker[0]:'';
    const rangeTimeEnd =  values!=null?values.rangePicker[1]:'';
    const taskName = values!=null?values.taskName:'';
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "TaskLogServiceImpl");
    dc.setParameter('_methodName', 'findTaskLog');
    dc.setParameter('_methodParameterTypes', 'String,String,String');
    dc.setParameter("_parameters", "rangeTimeStart,rangeTimeEnd,taskName");
    dc.setParameter("rangeTimeStart", rangeTimeStart);
    dc.setParameter("rangeTimeEnd", rangeTimeEnd);
    dc.setParameter("taskName", taskName);
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    var dispath = props.dispatch;
    dispath(taskMonitorAction({
      condition: [dc]
    }));
  }
  modelChange(getUserListSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "codeDictDataServiceImpl");
    dc.setParameter('_methodName', 'getCodeDict');
    dc.setParameter('_methodParameterTypes', 'String');
    dc.setParameter("_parameters", "codeType");
    dc.setParameter("codeType", "task");
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,getUserListSuccess)
  }
}
export  default  taskMonitorFormProcesor;
