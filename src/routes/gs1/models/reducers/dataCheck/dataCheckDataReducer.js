/**
 * Created by hp on 2017/6/15.
 */
import * as types from '../../actions/ActionTypes';
const initState={
  data:[],
  pagination: {
    pageSize:10,
    current: 1
  },
};
const dataCheckDataReducer = (state = initState , action) => {
  switch (action.type) {
    case types.CHECK_RESULT_DATA_ACTION:
      var dc = action.data;
      var ds = dc.getSingleDataStore();
      var data = dc.getSinglePrimary();
      let newState = {
        ...state,
        data: data,
        pagination: {
          total: ds.getRecordCount(),
          pageSize: ds.getPageSize(),
          current: ds.getPageNumber(),
        },
      };
      return {...state,...newState};
    default:return state;
  }
};
export default dataCheckDataReducer;
