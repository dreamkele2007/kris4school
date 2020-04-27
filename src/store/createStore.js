import {applyMiddleware, compose, createStore as createReduxStore} from 'redux'
import thunk from 'redux-thunk'
import {makeRootReducer} from 'reducers'


const createStore = (initialState = {}) => {

  const middleware = [thunk];
  
  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
    )
  );
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('reducers', () => {
      const reducers = require('reducers').default;
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
};

export default createStore
