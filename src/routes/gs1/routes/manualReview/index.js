/**
 * Created by viewhigh on 2017/6/19.
 */
export default {
  path: 'manualReview',
  name:"人工审核",
  breadcrumbName:"人工审核",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ManualReviewManagerViewer').default);
    });
  }
};
