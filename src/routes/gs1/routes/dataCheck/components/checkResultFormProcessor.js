/**
 * Created by hp on 2017/6/15.
 */
import  {checkResultAction} from '../../../models/actions/dataCheck/checkResultAction';
import HttpUtil from 'constants/httpUtil';
class checkResultFormProcessor {
  // 查询更新记录
  findUpdateInfo(props,condition){
    const rangeTimeStart = condition!=null?condition.rangeTimeStart:'';
    const rangeTimeEnd =  condition!=null?condition.rangeTimeEnd:'';
    const status = '';
    const downType = '';
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "UpdataInfoServiceImpl");
    dc.setParameter('_methodName', 'findByCondition');
    dc.setParameter('_methodParameterTypes', 'String,String,String,String');
    dc.setParameter("_parameters", "rangeTimeStart,rangeTimeEnd,status,downType");
    dc.setParameter("rangeTimeStart", rangeTimeStart);
    dc.setParameter("rangeTimeEnd", rangeTimeEnd);
    dc.setParameter("status", status);
    dc.setParameter("downType", downType);
    dc.setParameter("_pageNumber",1);
    dc.setParameter("_pageSize",  10);
    dc.setParameter("_calc", true);
    var dispatch = props.dispatch;
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      //下面的就是请求来的数据
      dispatch(checkResultAction(data,condition))
    });
  }

  // 通过
  passUpdataInfo(value,getDateSuccess) {
    var ds = new window.DataStore();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.UpdateInfo");
    var rowSet = new window.RowSet(value);
    ds.setRowSet(rowSet);
    var dc = new window.DataCenter();
    dc.addDataStore("updateInfo", ds);
    dc.setParameter("_boId", "UpdataInfoServiceImpl");
    dc.setParameter('_methodName', 'updatePassUpdateInfoStatus');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.UpdateInfo');
    dc.setParameter("_parameters", "updateInfo");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getDateSuccess);
  }

  // 不通过
  unPassUpdataInfo(value,getDateSuccess){
    var ds = new window.DataStore();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.UpdateInfo");
    var rowSet = new window.RowSet(value);
    ds.setRowSet(rowSet);
    var dc = new window.DataCenter();
    dc.addDataStore("updateInfo", ds);
    dc.setParameter("_boId", "UpdataInfoServiceImpl");
    dc.setParameter('_methodName', 'updateUnPassUpdateInfoStatus');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.UpdateInfo');
    dc.setParameter("_parameters", "updateInfo");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getDateSuccess);
  }

}
export default checkResultFormProcessor;
