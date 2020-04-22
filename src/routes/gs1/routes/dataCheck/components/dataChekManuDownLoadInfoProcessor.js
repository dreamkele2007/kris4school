/**
 * Created by admin on 2017/7/20.
 */
import HttpUtil from 'constants/httpUtil';
import  {dataUpdateRecordManuInfoAction} from '../../../models/actions/dataUpdateRecord/dataUpdateRecordAction';

class dataChekManuDownLoadInfoProcessor {

  queryDownLoadData(pagination,downId,props){
    const {dispatch} = props;
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "UpdataInfoServiceImpl");
    dc.setParameter('_methodName', 'findDownLoadDataByDownId');
    dc.setParameter('_methodParameterTypes', 'String');
    dc.setParameter("_parameters", 'downId');
    dc.setParameter("downId", downId);
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      //下面的就是请求来的数据
      dispatch(dataUpdateRecordManuInfoAction(data))
    });
  }
}
export default  dataChekManuDownLoadInfoProcessor;
