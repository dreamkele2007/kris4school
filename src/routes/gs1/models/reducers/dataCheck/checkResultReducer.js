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
  condition: {
    rangeTimeEnd: '',
    rangeTimeStart: '',
  }
};
const checkResultReducer = (state = initState , action) => {
  switch (action.type) {
    case types.CHECK_RESULT_ACTION:
      var dc = action.data;
      var data = dc.getSinglePrimary();
      var ds = dc.getSingleDataStore();
      let newState = {
        ...state,
        data: data,
        pagination: {
          total: ds.getRecordCount(),
          pageSize: ds.getPageSize(),
          current: ds.getPageNumber(),
        },
        condition: {
          rangeTimeEnd: action.condition.rangeTimeEnd,
          rangeTimeStart: action.condition.rangeTimeStart,
        }
      };
      return {...state,...newState};
    default:return state;
  }
};
export default checkResultReducer;
