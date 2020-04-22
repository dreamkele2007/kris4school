import * as types from '../ActionTypes';
export function MasterDataMenuAction(data,params){
  return {type:types.MASTER_DATA_MENU_ACTION, data:data,params:params};
}
