import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow } from '../../enzyme';
import ConnectedRegister, {
  Register
} from '../../src/components/pages/Register';

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

let registerWrapper;

const props = {
  registerUser: jest.fn()
};

beforeEach(() => {
  registerWrapper = shallow(
    <Provider store={store}>
      <ConnectedRegister />
    </Provider>
  );
});

describe('Register component', () => {
  it('renders without crashing', () => {
    expect(registerWrapper).toBeDefined();
  });

  it('renders top content header correctly', () => {
    const wrapper = shallow(<Register {...props} />);

    expect(
      wrapper
        .find('.auth-intro-text')
        .find('h4')
        .children()
        .text()
    ).toEqual('Register');
  });

  describe('onChange', () => {
    it('should call setState on full name', () => {
      const wrapper = shallow(<Register {...props} />);
      const mockEvent = {
        preventDefault: () => {},
        target: {
          name: 'fullname',
          value: 'Full Name'
        }
      };
      wrapper.instance().onChange(mockEvent);
      expect(wrapper.instance().state.fullname).toBe('Full Name');
    });

    it('should call setState on email', () => {
      const wrapper = shallow(<Register {...props} />);
      const mockEvent = {
        preventDefault: () => {},
        target: {
          name: 'email',
          value: 'moe@moe.com'
        }
      };
      wrapper.instance().onChange(mockEvent);
      expect(wrapper.instance().state.email).toBe('moe@moe.com');
    });

    it('should call setState on username', () => {
      const wrapper = shallow(<Register {...props} />);
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
      const wrapper = shallow(<Register {...props} />);
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
  });

  it('onSubmit method is called when the submit button is clicked', () => {
    const wrapper = shallow(<Register {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'onSubmit');
    const mockEvent = {
      preventDefault: () => {}
    };
    wrapper.instance().forceUpdate();
    wrapper.instance().onSubmit(mockEvent);
    expect(spy).toHaveBeenCalled();
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
        param: 'fullname',
        value: '',
        msg: 'Please provide your fullname'
      },
      {
        location: 'body',
        param: 'email',
        value: '',
        msg: 'Please provide your email'
      },
      {
        location: 'body',
        param: 'password',
        value: '',
        msg: 'Password cannot be shorter than 8 characters'
      }
    ];

    const wrapper = shallow(<Register {...props} />);
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
    const fullnameError = wrapper
      .find('.fullname-error')
      .children()
      .text();
    const emailError = wrapper
      .find('.email-error')
      .children()
      .text();

    expect(fullnameError).toEqual('Please provide your fullname');
    expect(emailError).toEqual('Please provide your email');
    expect(usernameError).toEqual('Please provide your username');
    expect(passwordError).toEqual(
      'Password cannot be shorter than 8 characters'
    );
    expect(spy).toHaveBeenCalled();
  });

  it('should call verifyLogin when the component mounts', () => {
    const historyMock = { push: jest.fn() };
    props.loggedIn = true;

    const wrapper = shallow(<Register {...props} history={historyMock} />);
    const spy = jest.spyOn(wrapper.instance(), 'verifyLogin');

    wrapper.instance().forceUpdate();
    wrapper.instance().componentDidMount();

    expect(spy).toHaveBeenCalled();
    expect(historyMock.push.mock.calls[0]).toEqual(['/']);
  });
});
