/**
 * Created by admin on 2017/7/27.
 */
import HttpUtil from 'constants/httpUtil';
import  {GoveQueryAction} from '../../../models/actions/goveData/goveQueryAction';
import  {GoveQueryOneAction} from '../../../models/actions/goveData/goveQueryOneAction';
class  SearchFromProcessor {
  //厂商下拉
  getMenuList(submitId,getListSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "goveDataListEditServiceImpl");
    dc.setParameter('_methodName', 'getMenuList');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getListSuccess);
  }
  //第一个tab页条件查询
  loadData(pagination,props, submitId,name) {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    const  manufacturingPlantName=props.form ==null?'': props.form.getFieldValue('manufacturingPlantName');
    const  matchDegree=name==='haveAudit'?'':props.form ==null?'': props.form.getFieldValue('matchDegree');
    dc.setParameter("_boId", "goveDataListEditServiceImpl");
    dc.setParameter('_methodName', 'getDateBySubmitId');
    dc.setParameter('_methodParameterTypes', 'String,String,String,String');
    dc.setParameter("_parameters", "submitId,manufacturingPlantName,matchDegree,name");
    dc.setParameter("submitId", submitId);
    dc.setParameter("manufacturingPlantName", manufacturingPlantName);
    dc.setParameter("matchDegree", matchDegree);
    dc.setParameter("name", name);
    dc.setParameter("_pageNumber", pagination != null ? pagination.current : 1);
    dc.setParameter("_pageSize", pagination != null ? pagination.pageSize : 10);
    dc.setParameter("_calc", true);
    var dispath = props.dispatch;
    dispath(GoveQueryAction({
      condition: [dc,ds]
    }));
  }
  //第二个tab页条件查询
  loadDataOne(pagination,props, submitId,name) {
    var dc = new window.DataCenter();
    var ds = new window.DataStore();
    const  manufacturingPlantName=props.form ==null?'': props.form.getFieldValue('manufacturingPlantName');
    const  matchDegree=name==='haveAudit'?'':props.form ==null?'': props.form.getFieldValue('matchDegree');
    dc.setParameter("_boId", "goveDataListEditServiceImpl");
    dc.setParameter('_methodName', 'getDateBySubmitId');
    dc.setParameter('_methodParameterTypes', 'String,String,String,String');
    dc.setParameter("_parameters", "submitId,manufacturingPlantName,matchDegree,name");
    dc.setParameter("submitId", submitId);
    dc.setParameter("manufacturingPlantName", manufacturingPlantName);
    dc.setParameter("matchDegree", matchDegree);
    dc.setParameter("name", name);
    dc.setParameter("_pageNumber", pagination != null ? pagination.current : 1);
    dc.setParameter("_pageSize", pagination != null ? pagination.pageSize : 10);
    dc.setParameter("_calc", true);
    var dispath = props.dispatch;
    dispath(GoveQueryOneAction({
      condition: [dc,ds]
    }));
  }
  //修改稽核状态值
  passUpdateIsCheckStatus(pagination,value,props,submitId,name) {
    var manufacturingPlantName = props.condition[0].parameters.manufacturingPlantName;
    var matchDegree = name==='haveAudit'?'':props.condition[0].parameters.matchDegree;
    var dc = new window.DataCenter();
    var ds = new window.DataStore();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.GoveDataEdit");
    var rowSet = new window.RowSet(value);
    ds.setRowSet(rowSet);
    dc.setParameter("_boId", "goveDataListEditServiceImpl");
    dc.setParameter('_methodName', 'passUpdateIsCheckStatus');
    dc.setParameter('_methodParameterTypes', 'java.util.List<com.viewhigh.vhgs1.entity.GoveDataEdit>,String,String,String,String');
    dc.setParameter("_parameters", "updataIsCheckList,submitId,name,manufacturingPlantName,matchDegree");
    dc.addDataStore("updataIsCheckList", ds);
    dc.setParameter("submitId", submitId);
    dc.setParameter("name", name);
    dc.setParameter("manufacturingPlantName", manufacturingPlantName);
    dc.setParameter("matchDegree", matchDegree);
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    var dispath = props.dispatch;
    dispath(GoveQueryAction({
      condition: [dc,ds]
    }));
  }
  //取消稽核
  cancelTheAudit(pagination,value,props,submitId,name) {
    var manufacturingPlantName = props.condition[0].parameters.manufacturingPlantName;
    var matchDegree = name==='haveAudit'?'':props.condition[0].parameters.matchDegree;
    var dc = new window.DataCenter();
    var ds = new window.DataStore();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.GoveDataEdit");
    var rowSet = new window.RowSet(value);
    ds.setRowSet(rowSet);
    dc.setParameter("_boId", "goveDataListEditServiceImpl");
    dc.setParameter('_methodName', 'cancelTheAudit');
    dc.setParameter('_methodParameterTypes', 'java.util.List<com.viewhigh.vhgs1.entity.GoveDataEdit>,String,String,String,String');
    dc.setParameter("_parameters", "updataIsCheckList,submitId,name,manufacturingPlantName,matchDegree");
    dc.addDataStore("updataIsCheckList", ds);
    dc.setParameter("submitId", submitId);
    dc.setParameter("name", name);
    dc.setParameter("manufacturingPlantName", manufacturingPlantName);
    dc.setParameter("matchDegree", matchDegree);
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    var dispath = props.dispatch;
    dispath(GoveQueryOneAction({
      condition: [dc,ds]
    }));
  }
}
export  default SearchFromProcessor;
