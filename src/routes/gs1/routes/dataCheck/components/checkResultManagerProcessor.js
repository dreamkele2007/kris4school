/**
 * Created by admin on 2017/7/7.
 */
import HttpUtil from 'constants/httpUtil';
import  {checkResultAction} from '../../../models/actions/dataCheck/checkResultAction';
class checkResultManagerProcessor {
  // 分页查询
  handleTableChange(pagination,condition,props) {
    const {dispatch} = props;
    var rangeTimeStart = condition.rangeTimeStart;
    var rangeTimeEnd = condition.rangeTimeEnd;
    var status = '';
    var downType = '';
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "UpdataInfoServiceImpl");
    dc.setParameter('_methodName', 'findByCondition');
    dc.setParameter('_methodParameterTypes', 'String,String,String,String');
    dc.setParameter("_parameters", "rangeTimeStart,rangeTimeEnd,status,downType");
    dc.setParameter("rangeTimeStart", rangeTimeStart);
    dc.setParameter("rangeTimeEnd", rangeTimeEnd);
    dc.setParameter("status", status);
    dc.setParameter("downType", downType);
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      //下面的就是请求来的数据
      dispatch(checkResultAction(data,condition))
    });
  };


  // 状态
  queryDictTypeList(getUserListSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "codeDictDataServiceImpl");
    dc.setParameter('_methodName', 'getCodeDict');
    dc.setParameter('_methodParameterTypes', 'String');
    dc.setParameter("_parameters", "codeType");
    dc.setParameter("codeType", 'updateRecord');
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getUserListSuccess);
  }

  // 更新类型
  queryDownTypes(getUserListSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "codeDictDataServiceImpl");
    dc.setParameter('_methodName', 'getCodeDict');
    dc.setParameter('_methodParameterTypes', 'String');
    dc.setParameter("_parameters", "codeType");
    dc.setParameter("codeType", 'downType');
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getUserListSuccess);
  }

}
export default checkResultManagerProcessor;
