import * as types from '../ActionTypes';
export function checkResultAction(data,condition) {
  console.log('checkResultAction',data,condition)
  return {type:types.CHECK_RESULT_ACTION,data:data,condition:condition}
}

export function checkResultDataAction(data) {
  console.log('checkResultAction',data)
  return {type:types.CHECK_RESULT_DATA_ACTION,data:data}
}
