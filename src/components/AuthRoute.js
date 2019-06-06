// PrivateRoute.js
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import checkAuth from '../utils/checkAuth';

const AuthRoute = ({
  component: Component, layout: Layout, ...rest
}) => (
  // eslint-disable-next-line
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Layout>
        <Component {...props} />
      </Layout>
    ) : (
      <Layout>
        <Component {...props} />
      </Layout>
    )
  )} />
);

AuthRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  layout: PropTypes.func,
  auth: PropTypes.bool
};

export default AuthRoute;
