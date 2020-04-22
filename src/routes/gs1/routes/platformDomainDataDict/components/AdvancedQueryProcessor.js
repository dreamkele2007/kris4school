/**
 * Created by hp on 2017/6/15.
 */

import 'antd/dist/antd.css';


import HttpUtil from '../../../../../constants/httpUtil';
import  {OperationAction} from '../../../models/actions/domain/domainAction';


class DomainFormProcessor {

  quickQuery(pagination,value,props){
    const {dispatch} = props;
    var dc = new window.DataCenter();
    dc.setParameter("time", value);
    dc.setParameter("_boId", "platformDomainDataDictService");
    dc.setParameter('_methodName', 'quickQueryDomianProduct');
    dc.setParameter('_methodParameterTypes', 'String');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "time");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      //下面的就是请求来的数据
      dispatch(OperationAction(data,dc))
    });
  }
  queryDomain(getUserListSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "domainCallbackUrlService");
    dc.setParameter('_methodName', 'queryDomain');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getUserListSuccess)
  }
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
      // 下面的就是请求来的数据
      dispatch(OperationAction(data,dc))
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
    dc.setParameter("_boId", "platformDomainDataDictService");
    dc.setParameter('_methodName', 'advancedDomianQueryProduct');
    dc.setParameter('_methodParameterTypes', 'java.util.List<com.viewhigh.vhgs1.entity.ConditionProduct>,String');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "item,radio");
    dc.setParameter("radio", radio);
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      //下面的就是请求来的数据
      dispatch(OperationAction(data,dc))
    });
  }
}

export default DomainFormProcessor;
