/**
 * Created by admin on 2017/7/24.
 */
/**
 * Created by hp on 2017/6/15.
 */
import * as types from '../../actions/ActionTypes';

// const DomainOperation = (state = {} , action) => {
//   // console.log(action)
//   switch (action.type) {
//     case types.DOMAIN_OPERATION:
//       return {...action.data};
//
//     default:return state;
//   }
// };
const CurrencyConfig = {
  left: {
    array: []
  }
};
const left = CurrencyConfig.left;
const DomainOperation = (state = {left}, action) => {
  let newState;
  switch (action.type) {
    case types.DOMAIN_OPERATION:
      var dc = action.data;
      var data = dc.getSinglePrimary();
      var ds = dc.getSingleDataStore();
      newState = {
        ...state,
        data: data,
        selectedRowKeys:[],
        pagination: {
          total: ds.getRecordCount(),
          pageSize: ds.getPageSize(),
          current: ds.getPageNumber(),
          defaultCurrent: 0
        }
      };
      return {...state, params:action.params,data:newState.data,pagination:newState.pagination,selectedRowKeys:newState.selectedRowKeys};
    default:
      return state;
  }
};
export default DomainOperation;
