import * as types from '../ActionTypes';
export function documentDistributeAction(data) {
  return {type:types.DOCUMENT_DISTRIBUTE_ACTION,data:data};
}
export function documentDistributeStatuAction(taskStatu) {
  return {type:types.DOCUMENT_DISTRIBUTE_STATU_ACTION,taskStatu:taskStatu};
}
