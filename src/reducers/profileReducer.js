/* eslint-disable indent */
import { userConstants } from '../constants';

const initialState = {
  details: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.PROFILE_REQUEST:
      return {
        ...state,
        success: false
      };
    case userConstants.PROFILE_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
        details: action.payload.profile
      };
    case userConstants.PROFILE_FAILURE:
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
        errors: action.payload.errors
      };
    default:
      return state;
  }
};

export default authReducer;
