import * as types from '../../actions/ActionTypes';
const GoveDataQuery = (state = {} , action) => {
  switch (action.type) {
    case types.GOVE_DATA_QUERY_ACTION:
      return {...action.data};

    default:return state;
  }
};
export default GoveDataQuery;
