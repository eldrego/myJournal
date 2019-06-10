import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../common/Header';
import Footer from '../common/Footer';

const UserLayout = (props) => {
  return (
    <Fragment>
      <Header history={props.history}/>
      <main className="container contentContainer">
        { props.children }
      </main>
      <Footer />
    </Fragment>
  );
};

UserLayout.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  children: PropTypes.object
};

export default UserLayout;
