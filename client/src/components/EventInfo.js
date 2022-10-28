import React, { useState } from "react";
import dayjs from "dayjs";
import Modal from "react-modal";

Modal.setAppElement("#root");

const EventInfo = (props) => {
  const [open, setOpen] = useState(false);
  const event = props.event;

  function toggleModal() {
    setOpen(!open);
  }

  return (
    <>
      <button onClick={toggleModal}>{event.description}</button>

      <Modal
        isOpen={open}
        onRequestClose={toggleModal}
        contentLabel={event.title}
      >
        <div>
          <button onClick={toggleModal}>X</button>
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
        </div>
      </Modal>
    </>
  );
};

export default EventInfo;
