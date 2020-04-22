import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from './store';
import App from 'containers/App';
import routes from './routes/';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = createStore(window.__INITIAL_STATE__);

ReactDOM.render(
  <App store={store} routes={routes}/>,
  document.getElementById('root')
);


registerServiceWorker();
