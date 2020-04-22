export default {
  path: 'registeredTenant',
  name:"registeredTenant",
  breadcrumbName:"注册租户",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/registeredTenant').default);
    });
  }
};
