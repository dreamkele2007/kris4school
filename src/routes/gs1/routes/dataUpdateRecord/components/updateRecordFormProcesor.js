/**
 * Created by admin on 2017/7/7.
 */
import HttpUtil from 'constants/httpUtil';
import  {dataUpdateRecordAction} from '../../../models/actions/dataUpdateRecord/dataUpdateRecordAction';
class updateRecordFormProcesor {
  // 查询更新记录
  findUpdateInfo(props,values){
    const rangeTimeStart = values!=null?values.rangePicker[0]:'';
    const rangeTimeEnd =  values!=null?values.rangePicker[1]:'';
    const status = values!=null?values.status:'';
    const downType = values!=null?values.downType:'';
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
    const condition = {
      rangeTimeStart:values!=null?values.rangePicker[0]:'',
      rangeTimeEnd:values!=null?values.rangePicker[1]:'',
      status:values!=null?values.status:'',
      downType:values!=null?values.downType:''
    }
    var dispatch = props.dispatch;
    debugger
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      //下面的就是请求来的数据
      dispatch(dataUpdateRecordAction(data,condition))
    });
  }

  // 查询状态下拉框
  queryDictTypeList(getUserListSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "UpdataInfoServiceImpl");
    dc.setParameter('_methodName', 'getStatusTypeList');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getUserListSuccess);
  }

}
export  default  updateRecordFormProcesor;
