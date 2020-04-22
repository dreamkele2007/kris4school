import * as types from '../../actions/ActionTypes';
const GoveQuery = (state = {} , action) => {
  switch (action.type) {
    case types.GOVE_QUERY_ACTION:
      return {...action.data};

    default:return state;
  }
};
export default GoveQuery;
