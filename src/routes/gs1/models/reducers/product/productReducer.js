import * as types from '../../actions/ActionTypes';
  const CurrencyConfig = {
    left: {
      array: []
    }
  };
  const left = CurrencyConfig.left;
  const ProductQUERY = (state = {left}, action) => {
    let newState;
    switch (action.type) {
      case types.Product_QUERY:
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
export default ProductQUERY;
