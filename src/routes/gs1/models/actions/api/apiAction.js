import * as types from '../ActionTypes';
export function ApiQueryAction(data) {
  return {type:types.API_QUERY,data:data};
}
