/**
 * Created by hp on 2017/6/15.
 */
import 'antd/dist/antd.css';
import  {OperationAction} from '../../../models/actions/domain/domainAction';
import HttpUtil from '../../../../../constants/httpUtil';
class DomainDictFormProcessor {
  queryDomainDataDict(pagination,value,props) {
    const {dispatch} = props;
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.DomainDataDict");
    var rowSet = new window.RowSet([{
      "productName": value,
    }]);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "platformDomainDataDictService");
    dc.setParameter('_methodName', 'queryDomainDataDict');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.DomainDataDict');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "item");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      //下面的就是请求来的数据
      dispatch(OperationAction(data,dc))
    });
  }
}
export default DomainDictFormProcessor;
