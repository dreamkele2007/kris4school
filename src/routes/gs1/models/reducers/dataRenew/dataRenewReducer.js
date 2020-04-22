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
  selectedRowKeys:[]
};
const dataRenewReducer = (state = initState , action) => {
  switch (action.type) {
    case types.DATA_RENEW_ACTION:
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
        }
      };
      return {...state,...newState};
    default:return state;
  }
};
export default dataRenewReducer;
