/**
 * Created by admin on 2017/7/20.
 */
import HttpUtil from 'constants/httpUtil';
import  {dataUpdateRecordDataAction} from '../../../models/actions/dataUpdateRecord/dataUpdateRecordAction';
class UpdateRecordDataProcessor {
  queryDataByPage(pagination, name, matchId, props) {
    var {dispatch} = props;
		var dc = new window.DataCenter();
		dc.setParameter("_boId", "UpdataInfoServiceImpl");
		dc.setParameter('_methodName', 'findByAllData');
		dc.setParameter('_methodParameterTypes', 'String,String');
		dc.setParameter("_parameters", 'name,matchId');
		dc.setParameter("name", name);
		dc.setParameter("matchId", matchId);
		dc.setParameter("_pageNumber", pagination != null ? pagination.current : 1);
		dc.setParameter("_pageSize", pagination != null ? pagination.pageSize : 10);
		dc.setParameter("_calc", true);
		//post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      //下面的就是请求来的数据
      dispatch(dataUpdateRecordDataAction(data))
    });
	}
}
export default UpdateRecordDataProcessor;
