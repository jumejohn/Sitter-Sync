import React from "react";

import { Outlet, Link } from "react-router-dom";

const Profile = (props) => {
  const user = props.user;
  if (!user) {
    return (
      <div className="container w-100 p-3">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="w-100 p-3">
        <div className="h1 welcome-tagline">
          <h1>Welcome to your page {user.firstname}</h1>
        </div>
        <nav className="navbar profile-nav w-100 p-3">
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
