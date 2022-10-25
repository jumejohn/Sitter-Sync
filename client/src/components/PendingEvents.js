import React from "react";

const PendingEvents = (props) => {
  const events =
    props.user.events.filter((event) => event.invitedUsers.length > 0) || null;
  console.log("user pending events", events);
  const children = events.children;

  return (
    <>
      {events ? (
        <div>
          {events.map((event) => {
            return (
              <div key={event._id}>
                <div>
                  {event.startDate}"-"{event.endDate}
                  {event.description}
                </div>
                {/* <div>
                  {children.map((child) => {
                    return (
                      <div>
                        {child.name}, {child.age}
                      </div>
                    );
                  })}
                </div> */}
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default PendingEvents;
