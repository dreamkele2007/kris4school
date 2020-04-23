import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {Provider} from 'react-redux';


const browserHistory = createBrowserHistory();

const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    <route.component {...props} routes={route.routes}/>
  )}/>
);

class App extends React.Component {

  shouldComponentUpdate() {
    return false
  }

  render() {
    const {store,routes} = this.props;
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Switch>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} store={store}/>
              )
            )}
          </Switch>
        </Router>
      </Provider>
    )
  }


}

export default App
