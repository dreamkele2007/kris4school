import * as types from '../ActionTypes';
export function RuleAction(data) {
  return {type:types.RULE_QUERY_ACTION,data:data};
}
