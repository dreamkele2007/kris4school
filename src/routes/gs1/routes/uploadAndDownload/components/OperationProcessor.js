/**
 * Created by admin on 2017/8/1.
 */
import HttpUtil from 'constants/httpUtil';
import  {GoveDataAction} from '../../../models/actions/goveData/goveDataAction';
class OperationProcessor {
  //执行检查
  performInspection(submitId,getSuccess) {
      var dc = new window.DataCenter();
      var ds = new window.DataStore();
      dc.addDataStore("items", ds);
      dc.setParameter("_boId", "uploadPoiServiceImpl");
      dc.setParameter('_methodName', 'performInspection');
      dc.setParameter('_methodParameterTypes', "String");
      dc.setParameter("_parameters", "submitId");
      dc.setParameter("submitId", submitId);
     HttpUtil.post('/api/commonProcessor/commonMethod', dc, getSuccess);
    }
   //执行检查
    performInspectionNow(submitId,getSuccess) {
      var dc = new window.DataCenter();
      var ds = new window.DataStore();
      dc.addDataStore("items", ds);
      dc.setParameter("_boId", "uploadPoiServiceImpl");
      dc.setParameter('_methodName', 'performInspectionNow');
      dc.setParameter('_methodParameterTypes', "String");
      dc.setParameter("_parameters", "submitId");
      dc.setParameter("submitId", submitId);
      HttpUtil.post('/api/commonProcessor/commonMethod', dc, getSuccess);
    }
    //查询
    findDomainSubmitData(props){
      const {dispatch} = props;
      var dc = new window.DataCenter();
      var ds = new window.DataStore();
      dc.addDataStore("items", ds);
      dc.setParameter("_boId", "goveSubmitServiceImpl");
      dc.setParameter('_methodName', 'findDomainSubmitData');
      dc.setParameter('_methodParameterTypes', "");
      dc.setParameter("_parameters", "");
      dispatch(GoveDataAction({
        condition: [dc,ds]
      }));
    }
}
export  default  OperationProcessor;
