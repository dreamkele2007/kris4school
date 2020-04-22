import React, {Component} from 'react';

import {Breadcrumb} from 'antd';


class Breadcrumbs extends Component {
  renderBreadcrumbMenu() {
    return (
      <span className="breadcrumb-menu">
            <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
            <a className="btn btn-secondary"><i className="icon-speech"/></a>
            <a className="btn btn-secondary" ><i className="icon-graph"/> &nbsp;Dashboard</a>
             <a className="btn btn-secondary" ><i className="icon-settings"/> &nbsp;Settings</a>
          </div>
      </span>
    )
  }

  render() {
    let {routes, params} = this.props;
    return (
      <Breadcrumb
        // prefixCls={'breadcrumb'}
        wrapperElement="ol"
        wrapperClass="breadcrumb"
        itemClass="breadcrumb-item"
        separator=""

        append={this.renderBreadcrumbMenu()}
        routes={routes} params={params}>

      </Breadcrumb>

    )
  }
}

export default Breadcrumbs;
