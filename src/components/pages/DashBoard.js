import React, { Fragment } from 'react';
import UserProfile from '../common/UserProfile';
import Notes from './Notes';

const DashBoard = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-12">
          <h4 className="pageHeader">User Dashboard</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <UserProfile />
        </div>
        <div className="col-md-9">
          <div className="row justify-content-md-center">
            <div className="col-md-12">
              <h4 className="subPageHeader">My Notes</h4>
              <Notes />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashBoard;
