/**
 * Created by admin on 2017/8/5.
 */
import HttpUtil from 'constants/httpUtil';

class  QualityReportModelProcessor{
  // 查询运算符字符串
  getRuleString(submitId,viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "goveRuleServiceImpl");
    dc.setParameter('_methodName', 'getRuleString');
    dc.setParameter('_methodParameterTypes', 'String');
    dc.setParameter("_parameters", "submitId");
    dc.setParameter("submitId", submitId);
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      viewer.setState({
        ruleString:dc.parameters.result,
      });
    }, function (data) {
    });
  }
  eChartsData(submitId,viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "goveRuleServiceImpl");
    dc.setParameter('_methodName', 'eChartsData');
    dc.setParameter('_methodParameterTypes', 'String');
    dc.setParameter("_parameters", "submitId");
    dc.setParameter("submitId", submitId);
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      viewer.setState({
        eChartsData:dc.getSinglePrimary(),
      });
    }, function (data) {
    });
  }
}
export  default  QualityReportModelProcessor;
