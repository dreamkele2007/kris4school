/**
 * Created by hp on 2017/6/15.
 */
export default {
  path: 'domainDataDict',
  name: 'domainDataDict',
  breadcrumbName: '产品',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/DomainDataDitManagerViewer1').default);
    });
  }
};
