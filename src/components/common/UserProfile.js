import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserProfile } from '../../actions/profileActions';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userProfile: {}
    };
  }

  componentDidMount() {
    this.props.getUserProfile();
  }

  render() {
    const { userProfile } = this.props;

    const status = userProfile.verified
      ? 'Account Verified'
      : 'Account has not been verified';

    const verifyClass = userProfile.verified
      ? 'small text-success'
      : 'small text-danger';

    return (
      <div className="userProfile">
        <h4>My Profile</h4>
        <div className="photoBox">
          <img
            className="headshot"
            src={userProfile.imageUrl}
            alt="user profile headshot"
          />
        </div>
        <div className="userDetails text-center">
          <p>
            <b>Fullname: </b>
            {userProfile.fullname}
          </p>
          <p>
            <b>Username: </b>
            {userProfile.username}
          </p>
          <p>
            <b>Email: </b>
            {userProfile.email}
          </p>
          <p className={verifyClass}>
            <em>{status}</em>
          </p>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  getUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  userProfile: state.profile.details
});

export default connect(
  mapStateToProps,
  { getUserProfile }
)(UserProfile);
