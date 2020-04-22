import * as types from '../ActionTypes';
export function GpcCodeQuery(data,params){
  return {type:types.GPC_CODE_QUERY, data:data,params:params};
}
