/**
 * Created by admin on 2017/7/7.
 */
import HttpUtil from 'constants/httpUtil';
class taskMonitorManagerProcessor {
  modelChange(pagination, condition, viewer) {
    var dc = condition != null ? condition[0] : viewer.props.condition;
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      console.log("data--------------")
      console.log(data)
      var dc = data;
      var ds = dc.getSingleDataStore();
      viewer.setState({
        data: dc.getSinglePrimary(),
        pagination: {
          total: ds.getRecordCount(),
          current: ds.getPageNumber(),
          defaultCurrent: 0
        }
      });
    }, function (data) {
    });
  }

  handleTableChange(pagination,condition,viewer) {
    var rangeTimeStart = viewer.props.condition[0].parameters.rangeTimeStart;
    var rangeTimeEnd = viewer.props.condition[0].parameters.rangeTimeEnd;
    // const rangeTimeStart = values!=null?values.rangePicker[0]:'';
    // const rangeTimeEnd =  values!=null?values.rangePicker[1]:'';
    const taskName = viewer.props.condition[0].parameters.taskName;
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "TaskLogServiceImpl");
    dc.setParameter('_methodName', 'findTaskLog');
    dc.setParameter('_methodParameterTypes', 'String,String,String');
    dc.setParameter("_parameters", "rangeTimeStart,rangeTimeEnd,taskName");
    dc.setParameter("rangeTimeStart", rangeTimeStart);
    dc.setParameter("rangeTimeEnd", rangeTimeEnd);
    dc.setParameter("taskName", taskName);
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    HttpUtil.post('/api/commonProcessor/commonMethod',dc,function (data) {
      var dc=data;
      var ds=dc.getSingleDataStore();
      viewer.setState({
        data: dc.getSinglePrimary(),
        pagination:{total:ds.getRecordCount(),current:ds.getPageNumber(),defaultCurrent:1}
      });
    },function(data){
    });
  };

}
export  default  taskMonitorManagerProcessor;
