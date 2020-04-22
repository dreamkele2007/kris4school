/**
 * Created by hp on 2017/6/15.
 */

import 'antd/dist/antd.css';


import HttpUtil from '../../../../../constants/httpUtil';
import  {MasterDataMenuAction} from '../../../models/actions/masterDataMenu/MasterDataMenuAction';


class DomainFormProcessor {

  handleSubmit(pagination,value,radio,props){
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.ConditionProduct");
    var rowSet = new window.RowSet(value);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "gs1manufacturingservice");
    dc.setParameter('_methodName', 'advancedQueryManufacturing');
    dc.setParameter('_methodParameterTypes', 'java.util.List<com.viewhigh.vhgs1.entity.ConditionProduct>,String');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "item,radio");
    dc.setParameter("radio", radio);
    var dispatch = props.dispatch;
    // dispatch(ProductQUERYAction({
    //   condition: [dc,ds]
    // }));
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      //下面的就是请求来的数据
      dispatch(MasterDataMenuAction(data,dc))
    });
  }
  quickQuery(pagination,value,props){
    var dc = new window.DataCenter();
    dc.setParameter("time", value);
    dc.setParameter("_boId", "gs1manufacturingservice");
    dc.setParameter('_methodName', 'quickQueryManufacturing');
    dc.setParameter('_methodParameterTypes', 'String');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    dc.setParameter("_parameters", "time");
    var dispatch = props.dispatch;
    // dispatch(MasterDataMenuAction({
    //   condition: [dc,ds]
    // }));
    HttpUtil.post('/api/commonProcessor/commonMethod', dc,function (data) {
      //下面的就是请求来的数据
      dispatch(MasterDataMenuAction(data,dc))
    });
  }
}

export default DomainFormProcessor;
