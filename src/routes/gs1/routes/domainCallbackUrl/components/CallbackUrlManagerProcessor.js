/**
 * Created by hp on 2017/6/15.
 */
import 'antd/dist/antd.css';
import HttpUtil from '../../../../../constants/httpUtil';
import  {DaomainQueryAction} from '../../../models/actions/domain/domainAction';

class ProductManagerProcessor {
  tableChange(pagination, condition, props) {
    const {dispatch} = props;
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.DomainCallbackUrl");
    var rowSet = new window.RowSet([{
      "domainId": props.params==null?null:props.params,
    }]);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "domainCallbackUrlService");
    dc.setParameter('_methodName', 'queryDomainCallbackUrlt');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.DomainCallbackUrl');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "item");
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {

      dispatch(DaomainQueryAction(data,props.params))
    }, function (data) {
    });
  }
}
export default ProductManagerProcessor;
