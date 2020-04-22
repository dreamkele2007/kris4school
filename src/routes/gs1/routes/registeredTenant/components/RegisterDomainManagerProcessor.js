/**
 * Created by admin on 2017/8/14.
 */
import HttpUtil from '../../../../../constants/httpUtil';
class  RegisterDomainManagerProcessor{
  formChange(pagination, condition, viewer) {
    var dc = condition != null ? condition[0] : viewer.props.condition;
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
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
          defaultCurrent: 0,
          selectedRowKeys:[]
        }
      });
    }, function (data) {
    });
  }
}
export  default  RegisterDomainManagerProcessor;
