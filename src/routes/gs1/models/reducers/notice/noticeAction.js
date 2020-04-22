import * as types from '../../actions/ActionTypes';
const NoticeQUERY = (state = {} , action) => {
  switch (action.type) {
    case types.NOTICE_RECORD:
      return {...action.data};

    default:return state;
  }
};
export default NoticeQUERY;
