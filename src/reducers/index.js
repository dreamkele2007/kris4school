import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux';
import uiReducer from './ui/uiReducer';
import SideReducer from '../routes/gs1/models/site'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    routing: routerReducer,
    ui:uiReducer,
    ...asyncReducers,
    site:SideReducer
  })
};

export const injectReducer = (store, {key, reducer}) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers))
};
export default makeRootReducer;
