/**
 * Created by admin on 2017/7/13.
 */
import HttpUtil from 'constants/httpUtil';
class  ModelViewerNewProcessor{
  loadRule(viewer,submitId){
    // const {dispatch} = props;
      var dc = new window.DataCenter();
      dc.setParameter("_boId", "goveRuleServiceImpl");
      dc.setParameter('_methodName', 'findDomainRule');
      dc.setParameter('_methodParameterTypes', 'String');
      dc.setParameter("_parameters", 'submitId');
      dc.setParameter("submitId", submitId);
      dc.setParameter("_pageNumber",1);
      dc.setParameter("_pageSize",10);
      dc.setParameter("_calc", true);
      HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
        //下面的就是请求来的数据
        var dc=data;
        viewer.setState({
          data: dc.getSinglePrimary(),
        });
      });
    }
  // 查询运算符下拉框
  getCalcuType(getListSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "codeDictDataServiceImpl");
    dc.setParameter('_methodName', 'getCodeDict');
    dc.setParameter('_methodParameterTypes', 'String');
    dc.setParameter("_parameters", "codeType");
    dc.setParameter("codeType", 'calcuType');
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getListSuccess);
  }
  // 查询租户字段下拉框
  getSourceCode(getListSuccess) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "codeDictDataServiceImpl");
    dc.setParameter('_methodName', 'getCodeDict');
    dc.setParameter('_methodParameterTypes', 'String');
    dc.setParameter("_parameters", "codeType");
    dc.setParameter("codeType", 'sourceCode');
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, getListSuccess);
  }
}
export  default  ModelViewerNewProcessor;
