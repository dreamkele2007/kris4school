/**
 * Created by admin on 2017/8/14.
 */
import  {HospitalQuery} from '../../../models/actions/hospital/hospital';
class RegisterDomainFormProcessor {

  queryHospital(pagination,value,props) {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.HospitalDict");
    var rowSet = new window.RowSet([{
      'hospitalName':value===""?null:value,
    }]);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "hospitalSercice");
    dc.setParameter('_methodName', 'queryHospital');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.HospitalDict');
    dc.setParameter("_parameters", "item");
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    var dispath = props.dispatch;
    dispath(HospitalQuery({
      condition: [dc,ds],
    }));
  }
  deleteHospital(value,props) {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.HospitalDict");
    var rowSet = new window.RowSet(value);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "hospitalSercice");
    dc.setParameter('_methodName', 'deleteHospital');
    dc.setParameter('_methodParameterTypes', 'java.util.List<com.viewhigh.vhgs1.entity.HospitalDict>');
    dc.setParameter("_parameters", "item");
    var dispath = props.dispatch;
    dispath(HospitalQuery({
      condition: [dc,ds],
    }));
  }
  addManuDomain(value,props) {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.HospitalDict");
    var rowSet = new window.RowSet([{
      'hospitalName':value.hospitalName,
      'hospitalLevel':value.hospitalLevel,
      'contacts':value.contacts,
      'city':value.city,
      'address':value.address,
      'zipcode':value.zipcode,
      'phone':value.phone,
    }]);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "hospitalSercice");
    dc.setParameter('_methodName', 'save');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.HospitalDict');
    dc.setParameter("_parameters", "item");
    dc.setParameter("_calc", true);
    var dispath = props.dispatch;
    dispath(HospitalQuery({
      condition: [dc,ds],
    }));
  }
  updateManuDomain(value,props) {
    var ds = new window.DataStore();
    var dc = new window.DataCenter();
    ds.setRowSetName("com.viewhigh.vhgs1.entity.HospitalDict");
    var rowSet = new window.RowSet([{
      'hospitalName':value.hospitalName,
      'hospitalLevel':value.hospitalLevel,
      'contacts':value.contacts,
      'city':value.city,
      'address':value.address,
      'zipcode':value.zipcode,
      'phone':value.phone,
      'domainId':value.domainId,
    }]);
    ds.setRowSet(rowSet);
    dc.addDataStore("item", ds);
    dc.setParameter("_boId", "hospitalSercice");
    dc.setParameter('_methodName', 'updateManuDomain');
    dc.setParameter('_methodParameterTypes', 'com.viewhigh.vhgs1.entity.HospitalDict');
    dc.setParameter("_parameters", "item");
    var dispath = props.dispatch;
    dispath(HospitalQuery({
      condition: [dc,ds],
    }));
  }
}

export default RegisterDomainFormProcessor;
