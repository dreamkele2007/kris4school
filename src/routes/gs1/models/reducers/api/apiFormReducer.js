/**
 * Created by hp on 2017/6/15.
 */
import * as types from '../../actions/ActionTypes';
const ApiQuery = (state = {} , action) => {
  switch (action.type) {
    case types.API_QUERY:
      return {...action.data};

    default:return state;
  }
};
export default ApiQuery;
