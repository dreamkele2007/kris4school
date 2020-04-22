/**
 * Created by hp on 2017/6/15.
 */
import 'antd/dist/antd.css';
import HttpUtil from '../../../../../constants/httpUtil';
import  {DaomainQueryAction} from '../../../models/actions/domain/domainAction';
class DomainManagerProcessor {
  tableChange(pagination, condition, props) {
    const {dispatch} = props;
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.HospitalDict");
    var rowSet = new window.RowSet([{
      "hospitalName":props.params==null?'':props.params
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
      dispatch(DaomainQueryAction(data,props.params))
    });
  }
}
export default DomainManagerProcessor;
