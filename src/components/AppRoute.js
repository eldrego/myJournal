/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import checkAuth from '../utils/checkAuth';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAuth() ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
      )
    }
  />
);

AppRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  layout: PropTypes.func,
  auth: PropTypes.bool
};

export default AppRoute;
