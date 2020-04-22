/**
 * Created by admin on 2017/7/7.
 */
import HttpUtil from 'constants/httpUtil';

class resultProcessor {

  queryNoticeRecordAll(pagination,type,id,viewer){
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "noticerecordservice");
    dc.setParameter('_methodName', 'queryNoticeRecordAll');
    dc.setParameter('_methodParameterTypes', 'String,String');
    dc.setParameter("_parameters", 'type,id');
    dc.setParameter("type", type);
    dc.setParameter("id", id);
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      //下面的就是请求来的数据
      var dc=data;
      var ds=dc.getSingleDataStore();
      console.log(dc.getSingleDataStore());
      viewer.setState({
        data: dc.getSinglePrimary(),
        pagination:{total:ds.getRecordCount(),current:ds.getPageNumber(),defaultCurrent:1}
      });
    });
  }
  formChange(pagination, condition, viewer) {
    var dc = condition != null ? condition[0] : viewer.props.condition;
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      var ds = dc.getSingleDataStore();
      viewer.setState({
        data: dc.getSinglePrimary(),
        pagination: {
          total: ds.getRecordCount(),
          pageSize: ds.getPageSize(),
          current: ds.getPageNumber(),
          defaultCurrent: 0
        }
      });
    }, function (data) {
    });
  }


}
export  default  resultProcessor;
