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
    <div>
      <h3>Events you have been invited to</h3>

      {shownEvents ? (
        <div>
          {shownEvents.map((event) => {
            if (!event.confirmedUsers.length > 0) {
              return (
                <li
                  key={event._id}
                  style={{ listStyle: "none" }}
                  className="content-box"
                >
                  <InvitedEventInfo event={event} />
                </li>
              );
            }
          })}
        </div>
      ) : (
        <div>
          <h4>No Events Scheduled Yet</h4>
        </div>
      )}
    </div>
  );
};

export default InvitedEvents;
