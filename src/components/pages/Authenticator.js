import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { switchAuthForm } from '../../actions/authActions';

class Authenticator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSignIn: true
    };

    this.switchState = this.switchState.bind(this);
  }

  switchState() {
    this.props.switchAuthForm(this.state.showSignIn);
    this.setState({
      showSignIn: !this.state.showSignIn
    });
  }

  render() {
    const { showSignIn } = this.state;
    return (
      <Fragment>
        {showSignIn ? <Login /> : <Register />}
        <div className="auth-footer">
          <div className="auth-footer-footer">
            <div className="row justify-content-md-center">
              <div className="col-md-12">
                {showSignIn ? (
                  <p>
                    Dont have an account?
                    <a
                      className="auth-footer-link"
                      onClick={this.switchState}
                      href="#"
                    >
                      Register
                    </a>
                  </p>
                ) : (
                  <p>
                    Already have an account?
                    <a
                      className="auth-footer-link"
                      onClick={this.switchState}
                      href="#"
                    >
                      Login
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Authenticator.propTypes = {
  switchAuthForm: PropTypes.func.isRequired,
  errors: PropTypes.array,
};

const mapStateToProps = state => ({
  errors: state.auth.errors
});

export default connect(mapStateToProps, { switchAuthForm })(withRouter(Authenticator));