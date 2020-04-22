import * as types from '../../actions/ActionTypes';
const HospitalQuery = (state = {} , action) => {
  switch (action.type) {
    case types.HOSPITAL_QUERY:
      return {...action.data};

    default:return state;
  }
};
export default HospitalQuery;
