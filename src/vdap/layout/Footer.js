import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">

        <span className="float-right">&copy; 2017 <a href={this.props.productLink}>{this.props.brand}</a></span>
      </footer>
    )
  }
}

export default Footer;
