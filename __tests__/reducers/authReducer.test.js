import { authConstants } from '../../src/constants';
import authReducer from '../../src/reducers/authReducer';

const initialState = {
  user: '',
  success: false,
  message: '',
  token: '',
  loggedIn: false
};

describe('Auth Reducer', () => {
  it('should return default state', () => {
    const newState = authReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should return new state at user registration request', () => {
    const newState = authReducer(initialState, {
      type: authConstants.REGISTER_REQUEST
    });
    expect(newState).toEqual(initialState);
  });

  it('should return new state at user registration success', () => {
    const payload = {
      success: true,
      message: 'User is successfull registered'
    };
    const newState = authReducer(initialState, {
      type: authConstants.REGISTER_SUCCESS,
      payload
    });

    const newObject = {
      ...initialState,
      ...payload
    };
    expect(newState).toEqual(newObject);
  });

  it('should return new state at user registration failure', () => {
    const payload = {
      success: false,
      message: 'Registration not successful',
      errors: [
        {
          location: 'body',
          param: 'username',
          value: '',
          msg: 'Please provide your username'
        },
        {
          location: 'body',
          param: 'password',
          value: '',
          msg: 'Password cannot be shorter than 8 charaters'
        }
      ]
    };
    const newState = authReducer(initialState, {
      type: authConstants.REGISTER_FAILURE,
      payload
    });

    const newObject = {
      ...initialState,
      ...payload
    };
    expect(newState).toEqual(newObject);
  });

  it('should return new state at user login request', () => {
    const newState = authReducer(initialState, {
      type: authConstants.LOGIN_REQUEST
    });
    expect(newState).toEqual(initialState);
  });

  it('should return new state at user login success', () => {
    const payload = {
      loggedIn: true,
      success: true,
      token: 'user123token.encoded.wit098huser567details',
      message: 'You have successfully logged in',
      username: 'myUsername'
    };
    const newState = authReducer(initialState, {
      type: authConstants.LOGIN_SUCCESS,
      payload
    });

    expect(newState).toEqual({
      loggedIn: true,
      success: true,
      token: 'user123token.encoded.wit098huser567details',
      message: 'You have successfully logged in',
      user: 'myUsername'
    });
  });

  it('should return new state at user login failure', () => {
    const payload = {
      success: false,
      message: 'Registration not successful',
      errors: [
        {
          location: 'body',
          param: 'username',
          value: '',
          msg: 'Please provide your username'
        },
        {
          location: 'body',
          param: 'password',
          value: '',
          msg: 'Password cannot be shorter than 8 charaters'
        }
      ]
    };
    const newState = authReducer(initialState, {
      type: authConstants.LOGIN_FAILURE,
      payload
    });

    const newObject = {
      ...initialState,
      ...payload
    };
    expect(newState).toEqual(newObject);
  });
});
