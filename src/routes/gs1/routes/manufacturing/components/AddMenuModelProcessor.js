/**
 * Created by admin on 2017/8/30.
 */
import HttpUtil from 'constants/httpUtil';

class AddMenuModelProcessor {
  addGs1MenuDict(pagination,value,props,getUserListSuccess) {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.Gs1ManuDict");
    var rowSet = new window.RowSet([value]);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "gs1manufacturingservice");
    dc.setParameter('_methodName', 'addGs1MenuDict');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.Gs1ManuDict');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "item");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,getUserListSuccess)
  }
  updateGs1MenuDict(pagination,value,props,getUserListSuccess) {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.Gs1ManuDict");
    var rowSet = new window.RowSet([value]);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "gs1manufacturingservice");
    dc.setParameter('_methodName', 'updateGs1MenuDict');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.Gs1ManuDict');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "item");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,getUserListSuccess);
  }
  deleteGs1MenuDist(pagination,value,props,getUserListSuccess) {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.Gs1ManuDict");
    var rowSet = new window.RowSet(value);
    ds.setRowSet(rowSet);
    dc.addDataStore("itemList", ds);
    dc.setParameter("_boId", "gs1manufacturingservice");
    dc.setParameter('_methodName', 'deleteGs1MenuDist');
    dc.setParameter('_methodParameterTypes', 'java.util.List<com.viewhigh.vhgs1.entity.Gs1ManuDict>');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "itemList");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,getUserListSuccess);
  }
}
export  default  AddMenuModelProcessor;
