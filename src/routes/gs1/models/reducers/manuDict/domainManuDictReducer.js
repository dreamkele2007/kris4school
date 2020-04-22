import * as types from '../../actions/ActionTypes';
const domainMenuDictReducer = (state = {
  data: [],
  pagination: {
    total: 0,
    current: 1
  },
  condition: {
    manuName:''
  }
} , action) => {
  let newState;
  switch (action.type) {
    case types.DOMAIN_MANUDICT_ACTION:
      var dc = action.data;
      var data = dc.getSinglePrimary();
      var ds = dc.getSingleDataStore();
      newState = {
        ...state,
        data: data,
        pagination: {
          total: ds.getRecordCount(),
          current: ds.getPageNumber()
        },
        condition: {
          manuName: action.condition.manuName,
        }
      };
      return newState;
    default:return state;
  }
};
export default domainMenuDictReducer;
