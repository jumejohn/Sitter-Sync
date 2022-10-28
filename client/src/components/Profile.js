import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../actions/fetchUser";
import FamilyDisplay from "./FamilyDisplay";
import EventsDisplay from "./EventsDisplay";

const Profile = () => {
  const dispatch = useDispatch();

  const token = localStorage.token;
  useEffect(() => {
    dispatch(fetchUser(token));
  }, [dispatch, token]);

  const user = useSelector(
    (state) => state.rootReducer.user.currentUser || null
  );

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
        <div className="row">
          <div className="col-4 ">
            <FamilyDisplay user={user} />
          </div>
          <div className="col-4 ">
            <h3 className="h3">Your Upcoming Events</h3>
            <EventsDisplay user={user} />
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
