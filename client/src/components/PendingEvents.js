import React from "react";
import EventInfo from "./EventInfo";

const PendingEvents = (props) => {
  const events =
    props.user.events.filter((event) => event.invitedUsers.length > 0) || null;
  console.log("user pending events", events);

  return (
    <>
      {events ? (
        <>
          {events.map((event) => {
            return (
              <li
                key={event._id}
                style={{ listStyle: "none" }}
                className="card"
              >
                <EventInfo event={event} />
              </li>
            );
          })}
        </>
      ) : null}
    </>
  );
};

export default PendingEvents;
