import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
// import {injectReducer} from 'reducers';
import Loadable from 'components/Loadable';
import Breadcrumb from './components/Breadcrumb';
import HomePage from './routes/homePage/index';
import StudentHome from './routes/shome/index';
import SiteManage from './routes/siteManage/index';


import {MainApp} from './components';

// 主数据档案
// const HospitalViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "HospitalViewer" */'./routes/hospital/components/HospitalViewer')
// });
// const ProductDataViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "ProductDataViewer" */'./routes/product/components/ProductManagerViewer')
// });
// const ManufacturingDataViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "ManufacturingDataViewer" */'./routes/manufacturing/components/ProductManagerViewer')
// });
// const GpcCategoryViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "GpcCategoryViewer" */'./routes/gpcCatagoryDict/components/GpcCatagoryViewer')
// });


// 编码中心同步
// const DataRenewManagerViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "DataRenewManagerViewer" */'./routes/dataRenew/components/DataRenewManagerViewer')
// });
// const CheckResultViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "CheckResultViewer" */'./routes/dataCheck/components/CheckResultManagerViewer')
// });
// const DataCheckManuDownLoadInfoViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "DataCheckManuDownLoadInfoViewer" */'./routes/dataCheck/components/DataCheckManuDownLoadInfoViewer')
// });
// const DataViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "DataViewer" */'./routes/dataCheck/components/DataViewer')
// });
// const UpdateRecordViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "UpdateRecordViewer" */'./routes/dataUpdateRecord/components/UpdateRecordManagerViewer')
// });
// const UpdateRecordManuDownLoadInfoViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "UpdateRecordManuDownLoadInfoViewer" */'./routes/dataUpdateRecord/components/UpdateRecordManuDownLoadInfoViewer')
// });
// const UpdateRecordDataViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "UpdateRecordDataViewer" */'./routes/dataUpdateRecord/components/UpdateRecordDataViewer')
// });
// // -------------------------------
// const NoticeRecordViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "NoticeRecordViewer" */'./routes/taskNoticeRecord/components/NoticeRecordManagerViewer')
// });
// const AddDataViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "AddDataViewer" */'./routes/taskNoticeRecord/components/AddDataViewer')
// });


// // ------------医院主数据档案查询---------------
// const platformDomainManuDict = Loadable({
//   loader: () => import(/* webpackChunkName: "platformDomainManuDict" */'./routes/platformDomainManuDict/components/DomainManuDitManagerViewer')
// });
// const platformDomainDataDict = Loadable({
//   loader: () => import(/* webpackChunkName: "platformDomainDataDict" */'./routes/platformDomainDataDict/components/DomainDataDitManagerViewer')
// });
// // --------------监控管理 ------------
// const ApiCallLogViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "ApiCallLogViewer" */'./routes/apiCallLog/components/ApiCallLogViewer')
// });
// const TaskMonitorManagerViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "TaskMonitorManagerViewer" */'./routes/taskMonitor/components/TaskMonitorManagerViewer')
// });

// // 系统管理
// const TaskManagerViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "TaskManagerViewer" */'./routes/taskManager/components/TaskManagerViewer')
// });
// const Authorization = Loadable({
//   loader: () => import(/* webpackChunkName: "Authorization" */'./routes/authorization/components/DomainManagerViewer')
// });

// const DomainCallbackUrl = Loadable({
//   loader: () => import(/* webpackChunkName: "DomainCallbackUrl" */'./routes/domainCallbackUrl/components/CallbackUrlManagerViewer')
// });

// const DomainManuDictManagerViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "DomainManuDictManagerViewer" */'./routes/domainManuDict/components/DomainManuDitManagerViewer')
// });
// const DomainDataDictManagerViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "DomainDataDictManagerViewer" */'./routes/domainDataDict/components/DomainDataDitManagerViewer')
// });
// // --------------数据质量-----------
// const UploadAndDownloadManagerViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "UploadAndDownloadManagerViewer" */'./routes/uploadAndDownload/components/UploadAndDownloadManagerViewer')
// });
// const ManualReviewManagerViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "ManualReviewManagerViewer" */'./routes/manualReview/components/ManualReviewManagerViewer')
// });
// const HistoryUpdateRecord = Loadable({
//   loader: () => import(/* webpackChunkName: "HistoryUpdateRecord" */'./routes/homePage/components/HistoryUpdateRecord')
// });
// const ArtificialMatchingViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "ArtificialMatchingViewer" */'./routes/artificialMatching/components/ArtificialMatchingViewer')
// });
// const ArtificialTotalViewer = Loadable({
//   loader: () => import(/* webpackChunkName: "ArtificialTotalViewer" */'./routes/artificialMatching/components/ArtificialTotalViewer')
// });



class Page extends Component {
	componentWillMount() {
	}
	componentDidMount() {
	}
	render() {
		const {
			match
		} = this.props;

		return (
			<div className="app header-fixed ">
        <MainApp {...this.props}>
          <Breadcrumb/>
          <Switch>
            {/******************************************/}
            <Route path={`${match.url}/shome`} name="实验室首页-学生"  component={StudentHome}/>
            {/*数据档案*/}
            <Route path={`${match.url}/site/manage`} breadcrumbName='Detail' name="站点管理" component={SiteManage}/>
            {/* <Route path={`${match.url}/site/manage`} breadcrumbName='Detail' name="医院" component={SiteManage}/>
            <Route path={`${match.url}/Product/PraductData`} name="产品" component={ProductDataViewer}/>
            <Route path={`${match.url}/Product/ManufacturingData`} name="厂商" component={ManufacturingDataViewer}/>
            <Route path={`${match.url}/Product/gpcCatagoryDictViewer`} name="产品分类" component={GpcCategoryViewer}/> */}
            {/*编码中心同步*/}
            {/* <Route path={`${match.url}/result/DataRenewManagerViewer`} name="数据同步" component={DataRenewManagerViewer}/>
            <Route path={`${match.url}/result/ResultViewer`} name="数据审核" component={CheckResultViewer}/>
            <Route path={`${match.url}/result/DataCheckManuDownLoadInfoViewer`}  component={DataCheckManuDownLoadInfoViewer}/>
            <Route path={`${match.url}/result/DataViewer`} component={DataViewer}/>
            <Route path={`${match.url}/result/UpdateRecordManagerViewer`} name="更新记录" component={UpdateRecordViewer}/>
            <Route path={`${match.url}/result/UpdateRecordManuDownLoadInfoViewer`}  component={UpdateRecordManuDownLoadInfoViewer}/>
            <Route path={`${match.url}/result/UpdateRecordDataViewer`} component={UpdateRecordDataViewer}/>
            <Route path={`${match.url}/result/NoticeRecordManagerViewer`} name="通知记录" component={NoticeRecordViewer}/>
            <Route path={`${match.url}/result/AddDataViewer`} name="数据" component={AddDataViewer}/> */}
            {/*档案分享*/}
            {/* <Route path={`${match.url}/fileSharing/DocumentDistributeManagerViewer`} name="档案分发" component={DocumentDistributeManagerViewer}/> */}
            {/*医院主数据档案查询*/}
            {/* <Route path={`${match.url}/platform/platformDomainManuDict`} name="厂商" component={platformDomainManuDict}/>
            <Route path={`${match.url}/platform/platformDomainDataDict`} name="产品" component={platformDomainDataDict}/> */}
            {/*监控管理*/}
            {/* <Route path={`${match.url}/api/ApiCallLogViewer`} name="Api调用日志" component={ApiCallLogViewer}/>
            <Route path={`${match.url}/api/TaskMonitorManagerViewer`} name="任务监控" component={TaskMonitorManagerViewer}/> */}
            {/*系统管理*/}
            {/* <Route path={`${match.url}/system/TaskMainViewer`} name="任务管理" component={TaskManagerViewer}/>
            <Route path={`${match.url}/system/Authorization`} name="注册租户管理" component={Authorization}/>
            {/*医院主数据档案*/}
            {/* <Route path={`${match.url}/dataFile/DomainManuDitManagerViewer`} name="厂商" component={DomainManuDictManagerViewer}/>
            <Route path={`${match.url}/dataFile/DomainDataDitManagerViewer`} name="产品" component={DomainDataDictManagerViewer}/> */}
            {/*数据质量*/}
            {/* <Route path={`${match.url}/newDataGovernance/UploadAndDownloadManagerViewer`} name="上传下载" component={UploadAndDownloadManagerViewer}/>
            <Route path={`${match.url}/newDataGovernance/ManualReviewManagerViewer`} name="数据稽核" component={ManualReviewManagerViewer}/> */}
            {/******************************************/}
            {/* <Route path={`${match.url}/HistoryUpdateRecord`} name="历史更新数据" component={HistoryUpdateRecord}/>
            <Route path={`${match.url}/dataGovernance/ArtificialMatchingViewer`} name="数据匹配" component={ArtificialMatchingViewer}/>
            <Route path={`${match.url}/dataGovernance/ArtificialTotalViewer`} name="详情数据" component={ArtificialTotalViewer}/>
            <Route path={`${match.url}/system/LayoutDemo`} name="可视化" component={LayoutDemo}/> */}
            <Redirect from={match.url} to={`${match.url}/shome`}/>
          </Switch>
        </MainApp>
      </div>
		)
	}
}
Page.contextTypes = {
	store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
});
export default connect(mapStateToProps)(Page);
