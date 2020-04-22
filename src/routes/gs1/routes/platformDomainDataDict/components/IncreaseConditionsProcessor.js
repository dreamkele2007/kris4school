/**
 * Created by hp on 2017/6/15.
 */
import 'antd/dist/antd.css';
import HttpUtil from '../../../../../constants/httpUtil';




class DomainFormProcessor {

  productDropDown(viewer){

    var dc = new window.DataCenter();
    dc.setParameter("_boId", "platformDomainDataDictService");
    dc.setParameter('_methodName', 'domainProductDropDownDictionaries');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters","");
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      viewer.setState({
        data:dc.getSinglePrimary(),
      })
    }, function (data) {
    });
  }
  operatortDropDown(viewer){
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "platformDomainDataDictService");
    dc.setParameter('_methodName', 'operatortDropDown');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters","");
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      viewer.setState({
        dataSource:dc.getSinglePrimary(),
      })
    }, function (data) {
    });
  }

}

export default DomainFormProcessor;
