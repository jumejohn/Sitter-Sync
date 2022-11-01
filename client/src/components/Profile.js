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
      <div className="container">
        <div className="h1">
          <h1>Welcome to your page {user.firstname}</h1>
        </div>
        <nav className="navbar navbar-light bg-light">
          <div className="container">
            <div className="row">
              <div className="container">
                <div className="navbar-brand">
                  <Link className="link" to="/profile/family">
                    Your Family
                  </Link>

                  <Link className="link" to="/profile/events">
                    Your Events
                  </Link>
                </div>
              </div>
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
