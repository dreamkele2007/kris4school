/**
 * Created by hp on 2017/6/15.
 */
import 'antd/dist/antd.css';
import HttpUtil from '../../../../../constants/httpUtil';
import  {MasterDataMenuAction} from '../../../models/actions/masterDataMenu/MasterDataMenuAction';
class ProductFormProcessor {
  likeQueryProduct(pagination,value,props) {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.DomainManuDict");
    var rowSet = new window.RowSet([{
      "manuName": value,
    }]);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "gs1manufacturingservice");
    dc.setParameter('_methodName', 'likeQueryManufacturing');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.DomainManuDict');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "item");
    var dispatch = props.dispatch;
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      //下面的就是请求来的数据
      dispatch(MasterDataMenuAction(data,dc))
    });
  }
}

export default ProductFormProcessor;
