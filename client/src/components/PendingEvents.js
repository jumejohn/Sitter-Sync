import React from "react";
import EventInfo from "./EventInfo";

const PendingEvents = (props) => {
  const events = props.user.events;

  return (
    <>
      <h3>Your upcoming events</h3>
      {events ? (
        <>
          {events.map((event) => {
            return (
              <div className="card mb-3 content-box" key={event._id}>
                <div className="card-container">
                  <EventInfo event={event} />
                </div>
              </div>
            );
          })}
        </>
      ) : null}
    </>
  );
};

export default PendingEvents;
