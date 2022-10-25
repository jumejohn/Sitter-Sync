import React from "react";

const ConfirmedEvents = (props) => {
  const events =
    props.events.filter((event) => event.confirmedUsers.length > 0) || null;
  const children = events.children;
  return (
    <div>
      {events.map((event) => {
        return (
          <div key={event._id}>
            <div>
              {event.startDate}"-"{event.endDate}
              {event.description}
            </div>
            <div>
              {children.map((child) => {
                return (
                  <div>
                    {child.name}, {child.age}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConfirmedEvents;
