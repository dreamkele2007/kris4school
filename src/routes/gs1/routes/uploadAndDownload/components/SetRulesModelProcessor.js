/**
 * Created by admin on 2017/7/31.
 */
import HttpUtil from 'constants/httpUtil';
import  {RuleAction} from '../../../models/actions/rule/RuleAction';
class SetRulesModelProcessor{
  saveRule(submitId,values,props){
    const {dispatch} = props;
    var dc = new window.DataCenter();
    var ds = new window.DataStore();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.GoveRule");
    var rowSet = new window.RowSet(values);
    ds.setRowSet(rowSet);
    dc.setParameter("_boId", "goveRuleServiceImpl");
    dc.setParameter('_methodName', 'saveRule');
    dc.setParameter('_methodParameterTypes', 'String,java.util.List<com.viewhigh.vhgs1.entity.GoveRule>');
    dc.setParameter("_parameters", "submitId,goveRuleList");
    dc.setParameter("submitId", submitId);
    dc.addDataStore("goveRuleList", ds);
    dc.setParameter("_calc", true);
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      dispatch(RuleAction({
        condition: [dc]
      }));
    });
  }


}
export  default  SetRulesModelProcessor;
