import * as types from '../../actions/ActionTypes';
const task = (state = {} , action) => {
  switch (action.type) {
    case types.TASK_MONITOR_ACTION:
      console.log(types.TASK_MONITOR_ACTION);
      return {...action.data};
    default:return state;
  }
};
export default task;
