import * as types from '../../actions/ActionTypes';
const Query = (state = {} , action) => {
  switch (action.type) {
    case types.QUERY_ACTION:
      return {...action.data};

    default:return state;
  }
};
export default Query;
