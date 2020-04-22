import * as types from '../constants/ActionTypes';


export const togglCollapsedSidebar = (isCollapsed) => {

  return {
    type: types.TOGGLE_COLLAPSED_SIDEBAR,
    payload: isCollapsed
  };
};
export const toggleHiddenAside = (isHidden) => {
  return {
    type: types.TOGGLE_HIDE_ASIDE,
    payload: isHidden
  };
};

