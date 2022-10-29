import React, { useState } from "react";
import dayjs from "dayjs";
import Modal from "react-modal";
import { deleteEvent } from "../actions/deleteEvent";
import { useDispatch } from "react-redux";

Modal.setAppElement("#root");

const EventInfo = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const event = props.event;

  const toggleModal = () => {
    setOpen(!open);
  };
  const deleteAnEvent = () => {
    dispatch(deleteEvent);
  };
  const handleDelete = () => {};

  return (
    <>
      <button onClick={toggleModal}>{event.description}</button>

      <Modal
        isOpen={open}
        onRequestClose={toggleModal}
        contentLabel={event.title}
      >
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
        </div>
        <button onClick={toggleModal}>CLOSE</button>
        <div>
          <button onClick={handleDelete}> Delete Event?</button>
        </div>
      </Modal>
    </>
  );
};

export default EventInfo;
