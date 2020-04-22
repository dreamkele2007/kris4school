import * as types from '../../actions/ActionTypes';
const RuleReducer = (state = {} , action) => {
  switch (action.type) {
    case types.RULE_QUERY_ACTION:
      return {...action.data};

    default:return state;
  }
};
export default RuleReducer;

