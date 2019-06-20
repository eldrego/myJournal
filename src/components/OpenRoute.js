/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const OpenRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

OpenRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  layout: PropTypes.func,
  auth: PropTypes.bool
};

export default OpenRoute;
