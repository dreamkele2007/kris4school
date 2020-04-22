/**
 * Created by hp on 2017/6/15.
 */

import 'antd/dist/antd.css';
import HttpUtil from '../../../../../constants/httpUtil';


class indexProcessor {
  //查看产品的总数
  queryLeftData( viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'queryVhProductNum');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      viewer.setState({
        totalNum: dc.getSinglePrimary()[0].num,
      });
    }, function (data) {
    });
  }
  //查看产品数据的变化
  productDataChange(viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'productDataChange');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      if(dc.getSinglePrimary().length==0){
        viewer.setState({
          updateNum:0,
          newNum:0,
          cancelNum:0,
        });
      }else{
        viewer.setState({

          updateNum:dc.getSinglePrimary()[0].updateNum,
          newNum:dc.getSinglePrimary()[0].newNum,
          cancelNum:dc.getSinglePrimary()[0].cancelNum,
        });
      }
    }, function (data) {
    });
  }
  //产品详情
  product(pagination,name,matchId,viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'productCategory');
    dc.setParameter('_methodParameterTypes', 'String,String');
    dc.setParameter("_parameters", "name,matchId");
    dc.setParameter("name",name);
    dc.setParameter("matchId",matchId);
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data
      var ds = dc.getSingleDataStore();
      console.log(dc.getSinglePrimary());
      viewer.setState({
        data:dc.getSinglePrimary(),
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
  //历史记录
  historicalRecord(pagination,viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'historicalRecord');
    dc.setParameter('_methodParameterTypes','');
    dc.setParameter("_parameters", '');
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:10);
    dc.setParameter("_calc", true);
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      var ds = dc.getSingleDataStore();
      viewer.setState({
        data:dc.getSinglePrimary(),
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
  //厂商的产讯
  queryProdctManuNum(viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'queryProdctManuNum');
    dc.setParameter('_methodParameterTypes','');
    dc.setParameter("_parameters", '');
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      viewer.setState({
        prodctManuNum:dc.getSinglePrimary()[0].num,
      });
    }, function (data) {
    });
  }
  //合作医院总数
  queryHospitalNum(viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'queryHospitalNum');
    dc.setParameter('_methodParameterTypes','');
    dc.setParameter("_parameters", '');
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      viewer.setState({
        hospitalNum:dc.getSinglePrimary()[0].hospitalNum
      });
    }, function (data) {
    });
  }
  //历史总数和注销总数
  cancelHistoricalRecord(viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'cancelHistoricalRecord');
    dc.setParameter('_methodParameterTypes','');
    dc.setParameter("_parameters", '');
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      // var ds = dc.getSingleDataStore();
      viewer.setState({
        sumCancelNum:dc.getSinglePrimary()[0].sumCancelNum!=null?dc.getSinglePrimary()[0].sumCancelNum:0,
        historicallNum:dc.getSinglePrimary()[0].historicalRecord
      });
    }, function (data) {
    });
  }
  //历史详情
  productHistory(pagination,name,matchId,viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'productCategory');
    dc.setParameter('_methodParameterTypes', 'String,String');
    dc.setParameter("_parameters", "name,matchId");
    dc.setParameter("name",name);
    dc.setParameter("matchId",matchId);
    dc.setParameter("_pageNumber",pagination!=null?pagination.current:1);
    dc.setParameter("_pageSize",  pagination!=null?pagination.pageSize:5);
    dc.setParameter("_calc", true);
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      var ds = dc.getSingleDataStore();
      viewer.setState({
        data:dc.getSinglePrimary(),
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

  eChartsData(viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'eChartsData');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      // var ds = dc.getSingleDataStore();
      viewer.setState({
        eChartsData:dc.getSinglePrimary(),

      });
    }, function (data) {
    });
  }
  eCharProductNum(viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'eCharProductNum');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      viewer.setState({
        eCharProductData:dc.getSinglePrimary(),
      });
    }, function (data) {
    });
  }


  queryNoticeRecordForm(viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'noticeRecord');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", '');
    dc.setParameter("_pageNumber",0);
    dc.setParameter("_pageSize",  5);
    dc.setParameter("_calc", true);
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data
      viewer.setState({
        noticeRecord:dc.getSinglePrimary(),
      });
    }, function (data) {
    });

  }

  dataInterfaceCall(viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'dataInterfaceCall');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    //post请求
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      viewer.setState({
        dataInterface:dc.getSinglePrimary()[0].apiNum
      });
    }, function (data) {
    });
  }
  queryUploadFile(viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'queryUploadFile');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      viewer.setState({
        uploadFile:dc.getSinglePrimary()[0].submitNum
      });
    }, function (data) {
    });
  }
  queryAuditFile(viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'queryAuditFile');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      // var ds = dc.getSingleDataStore();
      viewer.setState({
        auditNum:dc.getSinglePrimary()[0].auditNum
      });
    }, function (data) {
    });
  }
  dataQuality(viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'dataQuality');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      viewer.setState({
        matchPartDetail:dc.getSinglePrimary()[0].matchPartDetail
      });
    }, function (data) {
    });
  }
  queryDataNum(viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'queryDataNum');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      viewer.setState({
        sunDataNUM:dc.getSinglePrimary()[0].sunDataNUM
      });
    }, function (data) {
    });
  }
  region(viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'region');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      viewer.setState({
        regionNum:dc.getSinglePrimary()[0].regionNum
      });
    }, function (data) {
    });
  }
  gpcCatagory(viewer) {
    var dc = new window.DataCenter();
    dc.setParameter("_boId", "homepageservice");
    dc.setParameter('_methodName', 'gpcCatagory');
    dc.setParameter('_methodParameterTypes', '');
    dc.setParameter("_parameters", "");
    HttpUtil.post('/api/commonProcessor/commonMethod', dc, function (data) {
      var dc = data;
      viewer.setState({
        gpcNum:dc.getSinglePrimary()[0].gpcNum
      });
    }, function (data) {
    });
  }
}
export default indexProcessor;
