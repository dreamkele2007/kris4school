/**
 * Created by admin on 2017/7/26.
 */
import HttpUtil from 'constants/httpUtil';
import  {GoveDataAction} from '../../../models/actions/goveData/goveDataAction';
class UploadAndDownloadManagerProcessor {
  uploadData(pagination,props){
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "goveSubmitServiceImpl");
    dc.setParameter('_methodName', 'findDomainSubmitData');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", '');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    var dispatch = props.dispatch;
    dispatch(GoveDataAction({
      condition: [dc,ds]
    }));
  }
  loadDomainSubmitData(viewer,pagination){
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "goveSubmitServiceImpl");
    dc.setParameter('_methodName', 'findDomainSubmitData');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", '');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      //下面的就是请求来的数据
      var dc=data;
      var ds=dc.getSingleDataStore();
      viewer.setState({
        data: dc.getSinglePrimary(),
        pagination:{total:ds.getRecordCount(),current:ds.getPageNumber(),defaultCurrent:1}
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
        pagination:{total:ds.getRecordCount(),current:ds.getPageNumber(),defaultCurrent:1}
      });
    });
  }
  //获得本次提交的数据
  getSubmitData(viewer,pagination,submitId){
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "goveDataListEditServiceImpl");
    dc.setParameter('_methodName', 'getSubmitData');
    dc.setParameter('_methodParameterTypes', 'String');
    dc.setParameter("_parameters", 'submitId');
    dc.setParameter("submitId", submitId);
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      //下面的就是请求来的数据
      var dc=data;
      var ds=dc.getSingleDataStore();
      viewer.setState({
        dataValue: dc.getSinglePrimary(),
        page:{total:ds.getRecordCount(),current:ds.getPageNumber(),defaultCurrent:1}
      });
    });
  }

}
export  default  UploadAndDownloadManagerProcessor;
