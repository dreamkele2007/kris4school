/**
 * Created by viewhigh on 2017/6/16.
 */
import 'antd/dist/antd.css';
import HttpUtil from '../../../../constants/httpUtil';

class AppProcessor {
  // 手动执行
  queryTableList(getDataSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "DraggerServiceImpl");
    dc.setParameter('_methodName', 'getDatabases');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getDataSuccess);
  }
  // 手动执行
  queryCoulmnListList(tableName,getDataSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "DraggerServiceImpl");
    dc.setParameter('_methodName', 'getTableColumns');
    dc.setParameter('_methodParameterTypes', 'String');
    dc.setParameter("_parameters", "tableName");
    dc.setParameter("tableName", tableName);
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getDataSuccess);
  }
}

export default AppProcessor;
