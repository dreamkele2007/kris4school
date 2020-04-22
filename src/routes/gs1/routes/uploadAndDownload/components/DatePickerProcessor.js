/**
 * Created by admin on 2017/7/19.
 */
import  {GoveDataAction} from '../../../models/actions/goveData/goveDataAction';
class DatePickerProcessor {
  seach(pagination,values,props){
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    const startDate = values!=null?values.rangePicker[0]:'';
    const endDate = values!=null?values.rangePicker[1]:'';
    dc.setParameter("_boId", "goveSubmitServiceImpl");
    dc.setParameter('_methodName', 'findSubmitDataByDate');
    dc.setParameter('_methodParameterTypes', 'String,String');
    dc.setParameter("_parameters", 'startDate,endDate');
    dc.setParameter("startDate", startDate);
    dc.setParameter("endDate", endDate);
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    var dispatch = props.dispatch;
    dispatch(GoveDataAction({
      condition: [dc,ds]
    }));
  }
}
export  default  DatePickerProcessor;
