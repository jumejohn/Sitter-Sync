import React from "react";
import EventInfo from "./EventInfo";

const PendingEvents = (props) => {
  const events =
    props.user.events.filter((event) => event.invitedUsers.length > 0) || null;
  console.log("user pending events", events);

  return (
    <>
      {events ? (
        <div>
          {events.map((event) => {
            return (
              <div key={event._id}>
                <EventInfo event={event} />
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default PendingEvents;
