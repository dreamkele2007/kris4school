import * as types from '../../actions/ActionTypes';
const RegionQuery = (state = {} , action) => {
  switch (action.type) {
    case types.REGION_ACTION:
      return {...action.data};

    default:return state;
  }
};
export default RegionQuery;
