import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserMenu from './UserMenu';

class Header extends Component {
  render() {
    const { loggedIn } = this.props;
    let MenuDisplay;

    if (loggedIn) {
      MenuDisplay = <UserMenu props={this.props}/>;
    }

    return (
      <header >
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
              <div className="header-logo-box"><img src={'../logo.png'}/></div>
            </a>
            <button className="navbar-toggler" type="button"
              data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav float-right">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                { MenuDisplay }

                <li className="nav-item">
                  <Link className="nav-link" to="/auth/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/auth/register">Register</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(Header);
