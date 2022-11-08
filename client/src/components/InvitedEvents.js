import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvitedEvents } from "../actions/getInvitedEvents";
import InvitedEventInfo from "./InvitedEventInfo";

const InvitedEvents = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvitedEvents(props.user.email));
  }, []);

  const shownEvents = useSelector(
    (state) => state.rootReducer.events.invitedEvents || null
  );
  console.log("shown", shownEvents);
  return (
    <div className="w-100 p-3 mb-3">
      <h3>Events you have been invited to</h3>

      {shownEvents ? (
        <div className="content-box">
          {shownEvents.map((event) => {
            if (!event.confirmedUsers.length > 0) {
              return (
                <div className="card mb-3 content-box" key={event._id}>
                  <div className="card-container">
                    <InvitedEventInfo event={event} />
                  </div>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div className="content-box">
          <h4>No Events Scheduled Yet</h4>
        </div>
      )}
    </div>
  );
};

export default InvitedEvents;
