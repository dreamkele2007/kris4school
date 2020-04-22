/**
 * Created by hp on 2017/6/15.
 */

import 'antd/dist/antd.css';
import HttpUtil from '../../../../../constants/httpUtil';
import  {DaomainQueryAction} from '../../../models/actions/domain/domainAction';

class ProductFormProcessor {
  queryDomainManuDict(pagination,value,props)
  { const {dispatch} = props;
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.DomainCallbackUrl");
    var rowSet = new window.RowSet([{
      "domainId": value==null?null:value,
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
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      //下面的就是请求来的数据
      dispatch(DaomainQueryAction(data,value==null?null:value))
    });
  }
  addManuDomain(pagination,value,props,getUserListSuccess)
  {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.DomainCallbackUrl");
    var rowSet = new window.RowSet([value]);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "domainCallbackUrlService");
    dc.setParameter('_methodName', 'addDomainCallbackUrl');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.DomainCallbackUrl');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "item");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,getUserListSuccess);
  }
  updataManuDomain(pagination,value,props,getUserListSuccess)
  {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.DomainCallbackUrl");
    var rowSet = new window.RowSet([value]);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "domainCallbackUrlService");
    dc.setParameter('_methodName', 'updataCallbackUrl');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.DomainCallbackUrl');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "item");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,getUserListSuccess);
  }
  deleteManuDomain(pagination,value,props,getUserListSuccess)
  {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.DomainCallbackUrl");
    var rowSet = new window.RowSet(value);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "domainCallbackUrlService");
    dc.setParameter('_methodName', 'deleteCallbackUrl');
    dc.setParameter('_methodParameterTypes', 'java.util.List<com.viewhigh.vhgs1.entity.DomainCallbackUrl>');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "item");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,getUserListSuccess);
  }
  queryDomain(getUserListSuccess)
  {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "domainCallbackUrlService");
    dc.setParameter('_methodName', 'queryDomain');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getUserListSuccess)
  }
}

export default ProductFormProcessor;
