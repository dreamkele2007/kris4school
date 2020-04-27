import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import withLoadable from 'components/Loadable';
import {MainApp} from './components';

// 学生首页
const StudentHome = withLoadable(() => import('./routes/shome/index'));
// 站点管理
const SiteManage = withLoadable(() => import('./routes/siteManage/index'));


class Page extends Component {
	render() {
		const {
			match
		} = this.props;

		return (
			<div className="app header-fixed ">
        <MainApp {...this.props}>
          <Switch>
            {/* 学生首页 */}
            <Route path={`${match.url}/shome`} name="实验室首页-学生"  component={StudentHome}/>
            {/*数据档案*/}
            <Route path={`${match.url}/site/manage`} name="站点管理" component={SiteManage}/>
            <Redirect from={match.url} to={`${match.url}/shome`}/>
          </Switch>
        </MainApp>
      </div>
		)
	}
}
Page.contextTypes = {
	store: React.PropTypes.object
};
const mapStateToProps = (state, ownProps) => ({
});
export default connect(mapStateToProps)(Page);
