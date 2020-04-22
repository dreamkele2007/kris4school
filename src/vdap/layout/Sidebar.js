import React, {Component} from 'react';
import { connect } from 'react-redux';
import SideNav from './SideNav';

class Sidebar extends Component {

    handleClick(e) {
        e.preventDefault();
        e.target.parentElement.classList.toggle('open');
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    }

    // secondLevelActive(routeName) {
    //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    // }



    render() {
        return (

            <div className="sidebar">
                <SideNav {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
  fixedSide: state.settings.fixedSide,
  sideCollapsed: state.settings.sideCollapsed,
  fixedAside: state.settings.fixedAside,
  fixedHeader: state.settings.fixedHeader,
  hideAside: state.settings.hideAside,
  sidebarWidth : state.settings.sidebarWidth,
  theme: state.settings.theme,
});

export default connect(
  mapStateToProps
)(Sidebar);
