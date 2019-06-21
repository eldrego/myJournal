import { toastr } from 'react-redux-toastr';
import { userConstants } from '../constants';
import api from '../utils/api';

export const profileRequest = () => ({
  type: userConstants.PROFILE_REQUEST,
  payload: true
});

export const profileSuccess = (profileResponse) => ({
  type: userConstants.PROFILE_SUCCESS,
  payload: profileResponse
});

export const profileFailure = (error) => ({
  type: userConstants.PROFILE_FAILURE,
  payload: error
});

export const getUserProfile = () => (dispatch) => {
  dispatch(profileRequest());

  api.defaults.headers.common.Authorization = localStorage.token;
  api
    .get('/profile')
    .then((response) => {
      dispatch(profileSuccess(response.data));
      toastr.success(`Success : ${response.data.message}`);
    })
    .catch((error) => {
      toastr.error(`Error : ${error.response.data.message}`);
      dispatch(profileFailure(error.response.data));
    });
};
