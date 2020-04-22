/**
 * Created by hp on 2017/6/15.
 */
import 'antd/dist/antd.css';
import HttpUtil from '../../../../../constants/httpUtil';
import  {DaomainQueryAction} from '../../../models/actions/domain/domainAction';
class JurisdictionProcessor {
  likeQueryDomain(pagination,value,props) {
    const {dispatch} = props;
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.HospitalDict");
    var rowSet = new window.RowSet([{
      "hospitalName": value,
    }]);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "gs1AuthorizationService");
    dc.setParameter('_methodName', 'likeQueryDomain');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.HospitalDict');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "item");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      //下面的就是请求来的数据
      dispatch(DaomainQueryAction(data,value==null?null:value))
    });
  }
  updataDomain(pagination,doMain,props,getUserListSuccess) {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.HospitalDict");
    var rowSet = new window.RowSet([doMain]);
    ds.setRowSet(rowSet);
    dc.addDataStore("domain", ds);
    dc.setParameter("_boId", "gs1AuthorizationService");
    dc.setParameter('_methodName', 'updataDomain');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.HospitalDict');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "domain");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,getUserListSuccess);
  }
  addDomain(pagination,doMain,props,getUserListSuccess) {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.HospitalDict");
    var rowSet = new window.RowSet([doMain]);
    ds.setRowSet(rowSet);
    dc.addDataStore("domain", ds);
    dc.setParameter("_boId", "gs1AuthorizationService");
    dc.setParameter('_methodName', 'addDomain');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.HospitalDict');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "domain");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,getUserListSuccess);
  }
  sync(props,getUserListSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "gs1AuthorizationService");
    dc.setParameter('_methodName', 'syncDomain');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,getUserListSuccess);
  }

}
export default JurisdictionProcessor;
