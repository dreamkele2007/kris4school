import * as types from '../ActionTypes';

export function dataUpdateRecordAction(data,condition) {
  return {type:types.DATA_UPDATE_RECORD_ACTION,data:data,condition:condition};
}

// 厂商下载信息详情
export function dataUpdateRecordManuInfoAction(data) {
  return {type:types.DATA_UPDATE_RECORD_MANU_DOWNINFO,data:data};
}

// 更新信息详情
export function dataUpdateRecordDataAction(data) {
  return {type:types.DATA_UPDATE_RECORD_DATA,data:data};
}
