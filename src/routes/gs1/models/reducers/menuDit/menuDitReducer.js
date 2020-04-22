import * as types from '../../actions/ActionTypes';
const MenuDitQuery = (state = {} , action) => {
  switch (action.type) {
    case types.MENU_DIT_QUERY_ACTION:
      return {...action.data};

    default:return state;
  }
};
export default MenuDitQuery;
