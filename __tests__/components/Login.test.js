import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow } from '../../enzyme';
import ConnectedLogin, { Login } from '../../src/components/pages/Login';

const mockStore = configureMockStore();
const store = mockStore({
  auth: {
    user: '',
    success: false,
    message: '',
    token: '',
    loggedIn: false
  }
});

let loginWrapper;

const props = {
  loginUser: jest.fn()
};

beforeEach(() => {
  loginWrapper = shallow(
    <Provider store={store}>
      <ConnectedLogin />
    </Provider>
  );
});

describe('Login page', () => {
  it('renders without crashing', () => {
    expect(loginWrapper).toBeDefined();
  });

  it('renders top content header correctly', () => {
    const wrapper = shallow(<Login {...props} />);

    expect(
      wrapper
        .find('.auth-intro-text')
        .find('h4')
        .children()
        .text()
    ).toEqual('Login to your Account');
  });

  describe('onChange', () => {
    it('should call setState on username', () => {
      const wrapper = shallow(<Login {...props} />);
      const mockEvent = {
        preventDefault: () => {},
        target: {
          name: 'username',
          value: 'moe'
        }
      };
      wrapper.instance().onChange(mockEvent);
      expect(wrapper.instance().state.username).toBe('moe');
    });

    it('should call setState on password', () => {
      const wrapper = shallow(<Login {...props} />);
      const mockEvent = {
        preventDefault: () => {},
        target: {
          name: 'password',
          value: 'secretpassword'
        }
      };
      wrapper.instance().onChange(mockEvent);
      expect(wrapper.instance().state.password).toBe('secretpassword');
    });

    it('the submission of user credentials when the submit button is clicked', () => {
      const wrapper = shallow(<Login {...props} />);
      const spy = jest.spyOn(wrapper.instance(), 'onSubmit');
      const mockEvent = {
        preventDefault: () => {}
      };
      wrapper.instance().forceUpdate();
      wrapper.instance().onSubmit(mockEvent);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('handles errors', () => {
    props.errors = [
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
        msg: 'Password cannot be shorter than 8 characters'
      }
    ];

    const wrapper = shallow(<Login {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'handelErrors');
    wrapper.instance().forceUpdate();

    const usernameError = wrapper
      .find('.username-error')
      .children()
      .text();
    const passwordError = wrapper
      .find('.password-error')
      .children()
      .text();

    expect(usernameError).toEqual('Please provide your username');
    expect(passwordError).toEqual(
      'Password cannot be shorter than 8 characters'
    );
    expect(spy).toHaveBeenCalled();
  });

  it('should call verifyLogin when the component mounts', () => {
    const historyMock = { push: jest.fn() };
    props.loggedIn = true;

    const wrapper = shallow(<Login {...props} history={historyMock} />);
    const spy = jest.spyOn(wrapper.instance(), 'verifyLogin');

    wrapper.instance().forceUpdate();
    wrapper.instance().componentDidMount();

    expect(spy).toHaveBeenCalled();
    expect(historyMock.push.mock.calls[0]).toEqual(['/']);
  });
});
