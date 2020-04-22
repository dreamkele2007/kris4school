/**
 * Created by admin on 2017/8/1.
 */
import  {GoveQueryAction} from '../../../models/actions/goveData/goveQueryAction';
import  {GoveQueryOneAction} from '../../../models/actions/goveData/goveQueryOneAction';
class  ManualProcessor {
  //未稽核的修改方法
  updateData(pagination,props, domainDataId,submitId,values,name) {
    var manufacturingPlantName = props.condition[0].parameters.manufacturingPlantName;
    var matchDegree = name==='haveAudit'?'':props.condition[0].parameters.matchDegree;
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.GoveDataEdit");
    var rowSet = new window.RowSet([{
      'manufacturingPlantAddress':values.manufacturingPlantAddress,
      'manufacturingPlantName':values.manufacturingPlantName,
      'productDescription':values.productDescription,
      'gpcCatagoryCode':values.gpcCatagoryCode,
      'productName':values.productName,
      'brandName':values.brandName,
      'imageLink':values.imageLink,
      'productdataStatus':'1',
      'gs1Gtin':values.gs1Gtin,
      'spec':values.spec,
    }]);
    ds.setRowSet(rowSet);
    dc.addDataStore("goveDataEdit", ds);
    dc.setParameter("_boId", "goveDataListEditServiceImpl");
    dc.setParameter('_methodName', 'updateData');
    dc.setParameter('_methodParameterTypes', 'String,String,String,com.viewhigh.vhgs1.entity.GoveDataEdit,String,String');
    dc.setParameter("_parameters", "submitId,domainDataId,name,goveDataEdit,manufacturingPlantName,matchDegree");
    dc.setParameter("submitId", submitId);
    dc.setParameter("name", name);
    dc.setParameter("domainDataId", domainDataId);
    dc.setParameter("manufacturingPlantName", manufacturingPlantName);
    dc.setParameter("matchDegree", matchDegree);
    dc.setParameter("_pageNumber", pagination != null ? pagination.current : 1);
    dc.setParameter("_pageSize", pagination != null ? pagination.pageSize : 10);
    dc.setParameter("_calc", true);
    var dispath = props.dispatch;
    dispath(GoveQueryAction({
      condition: [dc,ds]
    }));
  }
  updateDataOne(pagination,props, domainDataId,submitId,values,name) {
    var manufacturingPlantName = props.condition[0].parameters.manufacturingPlantName;
    var matchDegree = name==='haveAudit'?'':props.condition[0].parameters.matchDegree;
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.GoveDataEdit");
    var rowSet = new window.RowSet([{
      'manufacturingPlantAddress':values.manufacturingPlantAddress,
      'manufacturingPlantName':values.manufacturingPlantName,
      'productDescription':values.productDescription,
      'gpcCatagoryCode':values.gpcCatagoryCode,
      'productName':values.productName,
      'brandName':values.brandName,
      'imageLink':values.imageLink,
      'productdataStatus':'1',
      'gs1Gtin':values.gs1Gtin,
      'spec':values.spec,
    }]);
    ds.setRowSet(rowSet);
    dc.addDataStore("goveDataEdit", ds);
    dc.setParameter("_boId", "goveDataListEditServiceImpl");
    dc.setParameter('_methodName', 'updateData');
    dc.setParameter('_methodParameterTypes', 'String,String,String,com.viewhigh.vhgs1.entity.GoveDataEdit,String,String');
    dc.setParameter("_parameters", "submitId,domainDataId,name,goveDataEdit,manufacturingPlantName,matchDegree");
    dc.setParameter("submitId", submitId);
    dc.setParameter("name", name);
    dc.setParameter("domainDataId", domainDataId);
    dc.setParameter("manufacturingPlantName", manufacturingPlantName);
    dc.setParameter("matchDegree", matchDegree);
    dc.setParameter("_pageNumber", pagination != null ? pagination.current : 1);
    dc.setParameter("_pageSize", pagination != null ? pagination.pageSize : 10);
    dc.setParameter("_calc", true);
    var dispath = props.dispatch;
    dispath(GoveQueryOneAction({
      condition: [dc,ds]
    }));
  }
  //修改稽核通过
  updateAndCheckedData(pagination,value,props,name) {
    var manufacturingPlantName = props.condition[0].parameters.manufacturingPlantName;
    var matchDegree = name==='haveAudit'?'':props.condition[0].parameters.matchDegree;
    var dc = new window.DataCenter();
    var ds = new window.DataStore();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.GoveDataEdit");
    var rowSet = new window.RowSet([value]);
    ds.setRowSet(rowSet);
    dc.setParameter("_boId", "goveDataListEditServiceImpl");
    dc.setParameter('_methodName', 'updateAndCheckedData');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.GoveDataEdit,String,String,String');
    dc.setParameter("_parameters", "goveDataEdit,name,manufacturingPlantName,matchDegree");
    dc.addDataStore("goveDataEdit", ds);
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
  //查询未稽核
  loadDataOne(pagination,props, submitId,name) {
    var dc = new window.DataCenter();
    var ds = new window.DataStore();
    dc.setParameter("_boId", "goveDataListEditServiceImpl");
    dc.setParameter('_methodName', 'getDateBySubmitId');
    dc.setParameter('_methodParameterTypes', 'String,String,String,String');
    dc.setParameter("_parameters", "submitId,manufacturingPlantName,matchDegree,name");
    dc.setParameter("submitId", submitId);
    dc.setParameter("manufacturingPlantName", '');
    dc.setParameter("matchDegree", '');
    dc.setParameter("name", name);
    dc.setParameter("_pageNumber", pagination != null ? pagination.current : 1);
    dc.setParameter("_pageSize", pagination != null ? pagination.pageSize : 10);
    dc.setParameter("_calc", true);
    var dispath = props.dispatch;
    dispath(GoveQueryOneAction({
      condition: [dc,ds]
    }));
  }
}
export  default  ManualProcessor;
