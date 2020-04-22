import APPCONFIG from '../constants/Config';
import * as types from '../constants/ActionTypes';

const initialSettings = APPCONFIG.settings;

const settings = (state = initialSettings, action) => {
  // console.log(action)
  switch (action.type) {

    case types.TOGGLE_COLLAPSED_SIDEBAR:

      return {
        ...state,
        collapsedSidebar: action.payload
      };
    case types.TOGGLE_HIDE_ASIDE:
      return {
        ...state,
        hideAside: action.payload
      };

    default:
      return state;
  }
};

export default settings;
