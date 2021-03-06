import decode from 'jwt-decode';
import { toastr } from 'react-redux-toastr';
import { authConstants } from '../constants';
import setAuthHeader from '../utils/setAuthHeader';
import api from '../utils/api';


export const registerRequest = userDetails => ({
  type: authConstants.REGISTER_REQUEST,
  payload: userDetails
});

export const registerSuccess = registerResponse => ({
  type: authConstants.REGISTER_SUCCESS,
  payload: registerResponse
});

export const registerFailure = error => ({
  type: authConstants.REGISTER_FAILURE,
  payload: error
});

export const registerUser = userDetails => (dispatch) => {
  dispatch(registerRequest(userDetails));

  api.post('/register', userDetails)
    .then((response) => {
      dispatch(registerSuccess(response.data));
      toastr.success(`Success : ${response.data.message}`);
      window.location.reload();
    })
    .catch((error) => {
      toastr.error(`Error : ${error.response.data.message}`);
      dispatch(registerFailure(error.response.data));
    });
};

export const loginRequest = userDetails => ({
  type: authConstants.LOGIN_REQUEST,
  payload: userDetails
});

export const loginSuccess = userDetails => ({
  type: authConstants.LOGIN_SUCCESS,
  payload: userDetails
});

export const loginFailure = error => ({
  type: authConstants.LOGIN_FAILURE,
  payload: error
});

export const loginUser = (userDetails, redirect) => (dispatch) => {
  dispatch(loginRequest());
  api.post('/login', userDetails)
    .then((response) => {
      dispatch(loginSuccess(response.data));
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const token = decode(response.data.token);
        setAuthHeader(token);
      }

      if (response.data.success) {
        toastr.success(response.data.message);
        redirect.push('/');
      }
    })
    .catch((error) => {
      toastr.error(`Error : ${error.response.data.message}`);
      dispatch(loginFailure(error.response.data));
    });
};

export const logoutRequest = () => ({
  type: authConstants.LOGOUT_REQUEST,
});

export const logoutSuccess = logoutStatus => ({
  type: authConstants.LOGOUT_SUCCESS,
  payload: logoutStatus
});

export const logoutFailure = () => ({
  type: authConstants.LOGOUT_FAILURE,
  payload: false
});

export const logoutUser = redirect => (dispatch) => {
  dispatch(logoutRequest());
  localStorage.removeItem('token');
  localStorage.removeItem('persist:auth');
  const token = localStorage.getItem('token');
  const persist = localStorage.getItem('persist:auth');

  if ((!token) && (!persist)) {
    const logoutStatus = {
      message: 'User Successfully Logged out',
      token: null,
      success: true
    };
    dispatch(logoutSuccess(logoutStatus));
    redirect.push('/auth');
  } else {
    dispatch(logoutFailure());
  }
};

export const switchSuccess = () => ({
  type: authConstants.SWITCH_SUCCESS,
});

export const switchAuthForm = () => (dispatch) => {
  dispatch(switchSuccess());
};
