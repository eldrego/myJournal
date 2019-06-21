import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../public/logo.png';
import { logoutUser } from '../../actions/authActions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    this.props.logoutUser(this.props.history);
  }

  renderUserMenu(user) {
    return (
      <Fragment>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="user-name">{user}</span>
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="#">
              Profile
            </a>
            <Link className="dropdown-item" to="/notes">
              My Notes
            </Link>
            <div className="dropdown-divider" />
            <span className="dropdown-item logout" onClick={this.logOut}>
              Logout
            </span>
          </div>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/create-note">
            New Note
          </Link>
        </li>
      </Fragment>
    );
  }

  render() {
    const { loggedIn, user } = this.props;
    const MenuDisplay = loggedIn ? (
      this.renderUserMenu(user)
    ) : (
      <li className="nav-item">
        <Link className="nav-link" to="/auth">
          Login
        </Link>
      </li>
    );

    return (
      <header>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand" to="/">
              <div className="header-logo-box">
                <img src={logo} />
              </div>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav float-right">{MenuDisplay}</ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.object,
  loggedIn: PropTypes.bool,
  user: PropTypes.string
};

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
  user: state.auth.user
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(Header)
);
