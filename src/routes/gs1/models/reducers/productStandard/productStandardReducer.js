import * as types from '../../actions/ActionTypes';
const ProductStandardQuery = (state = {} , action) => {
  switch (action.type) {
    case types.PRODUCT_STANDARD_QUERY_ACTION:
      return {...action.data};

    default:return state;
  }
};
export default ProductStandardQuery;
