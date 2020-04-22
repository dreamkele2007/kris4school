/**
 * Created by hp on 2017/6/15.
 */
import 'antd/dist/antd.css';
import HttpUtil from '../../../../../constants/httpUtil';
class JurisdictionProcessor {
  ReAuthorizeDomainPower(pagination,api,props,getUserListSuccess) {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.HospitalDict");
    var rowSet = new window.RowSet(api);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "gs1AuthorizationService");
    dc.setParameter('_methodName', 'reAuthorizeDomainPower');
    dc.setParameter('_methodParameterTypes', 'java.util.List<com.viewhigh.vhgs1.entity.HospitalDict>');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "item");
    dc.setParameter("criteria", props.formCriteria==null?'': props.formCriteria);
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,getUserListSuccess);
  }


}
export default JurisdictionProcessor;
