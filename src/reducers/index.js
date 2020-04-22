import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux';
import settings from './settings';
import uiReducer from './ui/uiReducer';
import ApiQuery from '../routes/gs1/models/reducers/api/apiFormReducer'
import ProductQUERY from '../routes/gs1/models/reducers/product/productReducer'
import  GoveDataQuery from '../routes/gs1/models/reducers/goveData/goveDataReducer';
import checkResultReducer from '../routes/gs1/models/reducers/dataCheck/checkResultReducer'
import manuDict from '../routes/gs1/models/reducers/manuDict/manuDict'
import NoticeQUERY from '../routes/gs1/models/reducers/notice/noticeAction'
import ProductStandardQuery from '../routes/gs1/models/reducers/productStandard/productStandardReducer'
import Query from '../routes/gs1/models/reducers/goveData/queryReducer'
import taskReducer from '../routes/gs1/models/reducers/taskManager/taskReducer'
import dataRenewReducer from '../routes/gs1/models/reducers/dataRenew/dataRenewReducer'
import dataCheckDataReducer from '../routes/gs1/models/reducers/dataCheck/dataCheckDataReducer'
import DomainOperation from '../routes/gs1/models/reducers/domain/domainOperation'
import taskMonitor from '../routes/gs1/models/reducers/taskMonitor/taskMonitor'
import  GoveQuery from '../routes/gs1/models/reducers/goveData/goveQueryReducer';
import  GoveQueryOne from '../routes/gs1/models/reducers/goveData/goveQueryOneReducer';
import  MenuDitQuery from '../routes/gs1/models/reducers/menuDit/menuDitReducer';
import regionDict from '../routes/gs1/models/reducers/region/regionDict'
import regionQuery from '../routes/gs1/models/reducers/region/RegionAction'
import gpcCatagory from '../routes/gs1/models/reducers/gpcCatagory/gpcCatagoryAction'
import gpcCatagoryQuery from '../routes/gs1/models/reducers/gpcCatagory/gpcCatagory'
import HospitalQuery from '../routes/gs1/models/reducers/hospital/hospitalAction'
import domainManuDictReducer from '../routes/gs1/models/reducers/manuDict/domainManuDictReducer'
import GpcCode from '../routes/gs1/models/reducers/gpcCode/GpcCode'
import documentDistributeReducer from '../routes/gs1/models/reducers/documentDistribute/documentDistributeReducer'
import MasterDataMenuReducer from '../routes/gs1/models/reducers/masterDataMenu/MasterDataMenuReducer'
import RuleReducer from '../routes/gs1/models/reducers/rule/RuleReducer'
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    routing: routerReducer,
    settings,
    ui:uiReducer,
    ...asyncReducers,
    ApiQuery,
    ProductQUERY,
    GoveDataQuery,
    manuDict,
    NoticeQUERY,
    checkResultReducer,
    ProductStandardQuery,
    DomainOperation,
    taskMonitor,
    GoveQuery,
    GoveQueryOne,
    MenuDitQuery,
    dataRenewReducer,
    regionDict,
    regionQuery,
    gpcCatagory,
    HospitalQuery,
    domainManuDictReducer,
    gpcCatagoryQuery,
    documentDistributeReducer,
    taskReducer,
    GpcCode,
    MasterDataMenuReducer,
    RuleReducer,
    dataCheckDataReducer
  })
};

export const injectReducer = (store, {key, reducer}) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers))
};
export default makeRootReducer;
