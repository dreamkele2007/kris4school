/**
 * Created by hp on 2017/6/15.
 */
export default {
  path: 'user',
  name: 'user',
  breadcrumbName: '用户管理',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/UserManagerViewer').default);
    });
  }
};
