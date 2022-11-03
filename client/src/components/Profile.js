import React from "react";

import { Outlet, Link } from "react-router-dom";

const Profile = (props) => {
  const user = props.user;
  if (!user) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="h1 welcome-tagline">
          <h1>Welcome to your page {user.firstname}</h1>
        </div>
        <nav className="navbar profile-nav">
          <div className="navbar-brand profile">
            <div>
              <Link className="link profile-link" to="/profile/family">
                Your Family
              </Link>
            </div>
            <div>
              <Link className="link profile-link" to="/profile/events">
                Your Events
              </Link>
            </div>
            <div>
              <Link className="link profile-link" to="/profile/me">
                Your Account
              </Link>
            </div>
          </div>
        </nav>
        <div>
          <Outlet />
        </div>
      </div>
    );
  }
};

export default Profile;
