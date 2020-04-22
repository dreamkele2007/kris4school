/**
 * Created by hp on 2017/6/15.
 */
import 'antd/dist/antd.css';
import HttpUtil from '../../../../../constants/httpUtil';
import  {ProductQUERYAction} from '../../../models/actions/product/productAction';

class DomainFormProcessor {
  quickQuery(pagination,value,props){
    const {dispatch} = props;
    var dc = new window.DataCenter();
    dc.setParameter("time", value);
    dc.setParameter("_boId", "gs1productservice");
    dc.setParameter('_methodName', 'quickQueryProduct');
    dc.setParameter('_methodParameterTypes', 'String');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "time");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      //下面的就是请求来的数据
      dispatch(ProductQUERYAction(data,dc))
    });
  }
  likeQueryProduct(pagination,value,props) {
    const {dispatch} = props;

    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    const values = value!=null?value:'';
    ds.setRowSetName("com.viewhigh.vhgs1.entity.ProductDataStandard");
    var rowSet = new window.RowSet([{
      "productName": values,
    }]);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "gs1productservice");
    dc.setParameter('_methodName', 'likeQueryProduct');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.ProductDataStandard');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "item");

    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      //下面的就是请求来的数据
      dispatch(ProductQUERYAction(data,dc))
    });
  }
  handleSubmit(pagination,value,radio,props){
    const {dispatch} = props;

    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.ConditionProduct");
    var rowSet = new window.RowSet(value);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "gs1productservice");
    dc.setParameter('_methodName', 'advancedQueryProduct');
    dc.setParameter('_methodParameterTypes', 'java.util.List<com.viewhigh.vhgs1.entity.ConditionProduct>,String');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "item,radio");
    dc.setParameter("radio", radio);
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      //下面的就是请求来的数据
      dispatch(ProductQUERYAction(data,dc))
    });
  }
}

export default DomainFormProcessor;
