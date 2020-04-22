import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Breadcrumb from './Breadcrumb';
import Aside from './Aside';
import Footer from './Footer';
// import Customizer from 'components/Customizer';


class MainApp extends React.Component {
  render() {
    const {children, location, routes, params} = this.props;

    return (

      <div className="app header-fixed  ">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">

            <div className="container-fluid">
              {children}
            </div>
          </main>
          <Aside/>
        </div>
        <Footer />
      </div>

    );
  }
}

export default MainApp;
