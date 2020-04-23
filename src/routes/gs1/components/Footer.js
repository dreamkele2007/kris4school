import React, { Component } from 'react';
import APPCONFIG from 'constants/Config';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <a href={APPCONFIG.productLink}>kris</a> &copy; {`${APPCONFIG.year}  ${APPCONFIG.brand}`}.
        <span className="float-right">...</span>
      </footer>
    )
  }
}

export default Footer;
