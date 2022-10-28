import React, { useState } from "react";
import dayjs from "dayjs";

const EventInfo = (props) => {
  const [open, setOpen] = useState("false");
  const event = props.event;

  const toggleInfo = () => {
    setOpen(!open);
  };
  return (
    <>
      {open ? (
        <button onClick={toggleInfo}>{event.description}</button>
      ) : (
        <div>
          <div>
            <h2>{event.title}</h2>
            <p>
              {dayjs(event.startDate).format("MMM D, YYYY h:mm A")} -
              {dayjs(event.endDate).format("MMM D, YYYY h:mm A")}
            </p>
            <p>{event.description}</p>
            <div>
              {event.children.map((child) => (
                <div key={child._id}>
                  <p>{child.name}</p>
                  <p>{child.age}</p>
                  <p>{child.childFacts}</p>
                </div>
              ))}
            </div>
            <button onClick={toggleInfo}>CLOSE</button>
          </div>
        </div>
      )}
    </>
  );
};

export default EventInfo;
