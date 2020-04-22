import * as types from '../ActionTypes';
export function ProductQUERYAction(data,params) {
  return {type:types.Product_QUERY,data:data,params:params};
}
