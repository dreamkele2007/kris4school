import * as types from '../ActionTypes';
export function DomainManuDictAction(data,condition) {
  return {type:types.DOMAIN_MANUDICT_ACTION,data:data,condition:condition};
}
