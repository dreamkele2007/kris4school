/**
 * Created by hp on 2017/6/15.
 */
export default {
  path: 'domainManuDict',
  name: 'domainManuDict',
  breadcrumbName: '厂商',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/DomainManuDitManagerViewer1').default);
    });
  }
};
