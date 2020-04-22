import * as types from '../../actions/ActionTypes';
const CataagoryQuery = (state = {} , action) => {
  switch (action.type) {
    case types.GPC_CATAAGORY:
      return {...action.data};

    default:return state;
  }
};
export default CataagoryQuery;
