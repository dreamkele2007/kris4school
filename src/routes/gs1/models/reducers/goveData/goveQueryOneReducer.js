import * as types from '../../actions/ActionTypes';
const GoveQueryOne = (state = {} , action) => {
  switch (action.type) {
    case types.GOVE_QUERY_ONE_ACTION:
      return {...action.data};

    default:return state;
  }
};
export default GoveQueryOne;
