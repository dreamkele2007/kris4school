import * as types from '../ActionTypes';
export function DaomainQueryAction(data,params){
  return {type:types.DOAMIN_QUERY, data:data,params:params};
}
export function OperationAction(data,params) {
  return {type:types.DOMAIN_OPERATION, data:data,params:params};
}
