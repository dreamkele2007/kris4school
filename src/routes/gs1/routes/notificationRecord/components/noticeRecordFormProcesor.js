/**
 * Created by admin on 2017/7/7.
 */
import HttpUtil from 'constants/httpUtil';
import  {NoticeQuery} from '../../../models/actions/notice/noticeAction';

class resultProcessor {
  queryDomainDrop(getUserListSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "apicalllog");
    dc.setParameter('_methodName', 'queryDomainDrop');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", '');
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getUserListSuccess)
  }


  queryNoticeRecordForm(pagination,values,props) {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    var dispath = props.dispatch;
    const rangeValue = values['time'];
    if (rangeValue != null && rangeValue.length > 1) {
      const value = {
        'rangePicker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };
      dc.setParameter("_boId", "noticerecordservice");
      dc.setParameter('_methodName', 'queryNptoceCondition');
      dc.setParameter('_methodParameterTypes', 'String,String,String');
      dc.setParameter("_parameters", 'startTime,,endTime,domainId');
      dc.setParameter("startTime", value.rangePicker[0]);
      dc.setParameter("endTime", value.rangePicker[1]);
      dc.setParameter("domainId", values.domainId);
      dc.setParameter("_pageNumber", pagination != null ? pagination.current : 1);
      dc.setParameter("_pageSize", pagination != null ? pagination.pageSize : 10);
      dc.setParameter("_calc", true);
      dispath(NoticeQuery({
        condition: [dc, ds]
      }));
    } else {
      dc.setParameter("_boId", "noticerecordservice");
      dc.setParameter('_methodName', 'queryNptoceCondition');
      dc.setParameter('_methodParameterTypes', 'String,String,String');
      dc.setParameter("_parameters", 'startTime,,endTime,domainId');
      dc.setParameter("startTime", null);
      dc.setParameter("endTime", null);
      dc.setParameter("domainId", values.domainId);
      dc.setParameter("_pageNumber", pagination != null ? pagination.current : 1);
      dc.setParameter("_pageSize", pagination != null ? pagination.pageSize : 10);
      dc.setParameter("_calc", true);
      dispath(NoticeQuery({
        condition: [dc, ds]
      }));
    }
  }
}
export  default  resultProcessor;
