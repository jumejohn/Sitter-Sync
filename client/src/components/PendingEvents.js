import React from "react";
import EventInfo from "./EventInfo";

const PendingEvents = (props) => {
  const events = props.user.events;

  return (
    <div className="w-100 p-3 mb-3">
      <h3>Your upcoming events</h3>
      {events ? (
        <div className="content-box">
          {events.map((event) => {
            return (
              <div className="card mb-3" key={event._id}>
                <div className="card-container">
                  <EventInfo event={event} />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default PendingEvents;
