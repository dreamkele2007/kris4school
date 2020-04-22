/**
 * Created by admin on 2017/7/27.
 */
import HttpUtil from 'constants/httpUtil';
import  {GoveQueryAction} from '../../../models/actions/goveData/goveQueryAction';
import  {GoveQueryOneAction} from '../../../models/actions/goveData/goveQueryOneAction';
class  ManualReviewManagerProcessor {
  loadMagData(pagination,props, submitId,name) {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
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
    dispath(GoveQueryAction({
      condition: [dc,ds]
    }));
  }
  /**
   * 根据租户本次上传数据的submitId进行查询
   * @param viewer
   * @param pagination
   * @param submitId
   */
  loadData(viewer, pagination, submitId,name) {
    var dc = new window.DataCenter();
    var manufacturingPlantName = viewer.props.condition[0].parameters.manufacturingPlantName;
    var matchDegree = name==='haveAudit'?'':viewer.props.condition[0].parameters.matchDegree;
    dc.setParameter("_boId", "goveDataListEditServiceImpl");
    dc.setParameter('_methodName', 'getDateBySubmitId');
    dc.setParameter('_methodParameterTypes', 'String,String,String,String');
    dc.setParameter("_parameters", "submitId,manufacturingPlantName,matchDegree,name");
    dc.setParameter("submitId", submitId);
    dc.setParameter("manufacturingPlantName", manufacturingPlantName);
    dc.setParameter("matchDegree", matchDegree);
    dc.setParameter("name", name);
    dc.setParameter("_pageNumber", pagination != null ? pagination.current : 1);
    dc.setParameter("_pageSize", pagination != null ? pagination.pageSize : 5);
    dc.setParameter("_calc", true);
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      //下面的就是请求来的数据
      var dc = data;
      var ds = dc.getSingleDataStore();
      viewer.setState({
        data: dc.getSinglePrimary(),
        pagination: {
          total: ds.getRecordCount(),
          current: ds.getPageNumber(),
          defaultCurrent: 0,
        },
      });
    });
  }
  tableLoadData(props, pagination, submitId,name) {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    var manufacturingPlantName = props.condition[0].parameters.manufacturingPlantName;
    var matchDegree = name==='haveAudit'?'':props.condition[0].parameters.matchDegree;
    dc.setParameter("_boId", "goveDataListEditServiceImpl");
    dc.setParameter('_methodName', 'getDateBySubmitId');
    dc.setParameter('_methodParameterTypes', 'String,String,String,String');
    dc.setParameter("_parameters", "submitId,manufacturingPlantName,matchDegree,name");
    dc.setParameter("submitId", submitId);
    dc.setParameter("manufacturingPlantName", manufacturingPlantName);
    dc.setParameter("matchDegree", matchDegree);
    dc.setParameter("name", name);
    dc.setParameter("_pageNumber", pagination != null ? pagination.current : 1);
    dc.setParameter("_pageSize", pagination != null ? pagination.pageSize : 5);
    dc.setParameter("_calc", true);
    var dispath = props.dispatch;
    dispath(GoveQueryAction({
      condition: [dc,ds]
    }));
  }
  tableLoadDataOne(props, pagination, submitId,name) {
    var dc = new window.DataCenter();
    var ds = new window.DataStore();
    var manufacturingPlantName = props.condition[0].parameters.manufacturingPlantName;
    var matchDegree = name==='haveAudit'?'':props.condition[0].parameters.matchDegree;
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
  loadDataOne(viewer, pagination, submitId,name) {
    var dc = new window.DataCenter();
    var manufacturingPlantName = viewer.props.condition[0].parameters.manufacturingPlantName;
    var matchDegree = name==='haveAudit'?'':viewer.props.condition[0].parameters.matchDegree;
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
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      //下面的就是请求来的数据
      var dc = data;
      var ds = dc.getSingleDataStore();
      viewer.setState({
        data: dc.getSinglePrimary(),
        pagination: {
          total: ds.getRecordCount(),
          current: ds.getPageNumber(),
          defaultCurrent: 0,
        },
      });
    });
  }
  formChange1(value, condition, viewer) {
    var dc = condition != null ? condition[0] : viewer.props.condition;
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      //下面的就是请求来的数据
      var dc=data;
      var ds=dc.getSingleDataStore();
      viewer.setState({
        data: dc.getSinglePrimary(),
        pagination:{
          total:ds.getRecordCount(),
          current:ds.getPageNumber(),
          defaultCurrent:1
        },
      });
    });
  }
  formChange(value, condition, viewer) {
    var dc = condition != null ? condition[0] : viewer.props.condition;
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      //下面的就是请求来的数据
      var dc=data;
      var ds=dc.getSingleDataStore();
      viewer.setState({
        data: dc.getSinglePrimary(),
        pagination:{
          total:ds.getRecordCount(),
          current:ds.getPageNumber(),
        },
      });
    });
  }
  getMatchData(pagination, domainDataId,viewer) {
    var domainDataId=domainDataId==null? '':domainDataId;
      var dc = new window.DataCenter();
      dc.setParameter("_boId", "goveDataListEditServiceImpl");
      dc.setParameter('_methodName', 'getMatchData');
      dc.setParameter('_methodParameterTypes', 'String');
      dc.setParameter("_parameters", "domainDataId");
      dc.setParameter("domainDataId", domainDataId);
      dc.setParameter("_pageNumber", pagination != null ? pagination.current : 1);
      dc.setParameter("_pageSize", pagination != null ? pagination.pageSize : 10);
      dc.setParameter("_calc", true);
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      //下面的就是请求来的数据
      var dc=data;
      var ds = dc.getSingleDataStore();
      viewer.setState({
        dataSource: dc.getSinglePrimary(),
        page: {
          total: ds.getRecordCount(),
          pageSize: ds.getPageSize(),
          current: ds.getPageNumber(),
          defaultCurrent: 0
        }
      });
    });
  }
  //手动匹配
  getManualMatchData(manufacturingPlantName,productName,spec,gtin,pagination,viewer) {
    var manufacturingPlantName=manufacturingPlantName==null? '':manufacturingPlantName;
    var spec=spec==null? '':spec;
    var productName=productName==null? '':productName;
    var gtin=gtin==null? '':gtin;
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "gs1productservice");
    dc.setParameter('_methodName', 'getManualMatchData');
    dc.setParameter('_methodParameterTypes', 'String,String,String,String');
    dc.setParameter("_parameters", "manufacturingPlantName,productName,spec,gtin");
    dc.setParameter("manufacturingPlantName", manufacturingPlantName);
    dc.setParameter("productName", productName);
    dc.setParameter("spec", spec);
    dc.setParameter("gtin", gtin);
    dc.setParameter("_pageNumber", pagination != null ? pagination.current : 1);
    dc.setParameter("_pageSize", pagination != null ? pagination.pageSize : 10);
    dc.setParameter("_calc", true);
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      //下面的就是请求来的数据
      var dc=data;
      var ds = dc.getSingleDataStore();
      viewer.setState({
        dataSource: dc.getSinglePrimary(),
        page: {
          total: ds.getRecordCount(),
          pageSize: ds.getPageSize(),
          current: ds.getPageNumber(),
          defaultCurrent: 0,
        }
      });
    });
  }
  //标准厂商下拉
  getMatchMenuNameList(getListSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "gs1productservice");
    dc.setParameter('_methodName', 'getMatchMenuNameList');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getListSuccess);
  }
  //查询条数方法
  getCount(submitId,name,getListSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "goveDataListEditServiceImpl");
    dc.setParameter('_methodName', 'getCount');
    dc.setParameter('_methodParameterTypes', 'String,String');
    dc.setParameter("_parameters", "submitId,name");
    dc.setParameter("submitId", submitId);
    dc.setParameter("name", name);
    dc.setParameter("_calc", true);
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getListSuccess);
  }
}
export  default ManualReviewManagerProcessor;
