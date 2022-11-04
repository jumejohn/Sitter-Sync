import React, { useState } from "react";
import dayjs from "dayjs";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { confirmEvent } from "../actions/confirmEvent";

Modal.setAppElement("#root");

const InvitedEventInfo = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const event = props.event;

  const toggleModal = () => {
    setOpen(!open);
  };
  const handleConfirm = () => {
    dispatch(confirmEvent(event._id, event.email));
    window.location.reload();
  };
  const handleDecline = () => {};
  return (
    <div>
      <h5 className="card-title family-button" onClick={toggleModal}>
        {dayjs(event.startDate).format("MMM D")} : {event.title}
      </h5>

      <Modal
        isOpen={open}
        onRequestClose={toggleModal}
        contentLabel={event.title}
        style={{
          content: { margin: "40px", display: "flex", height: "100%" },
        }}
      >
        <div>
          <div className="card " style={{ maxWidth: "100%" }}>
            <div className="row">
              <div className="whitespace-container">
                <div className="whitespace-container-row">
                  <div className="content-box">
                    <h2>{event.title}</h2>
                    <p>
                      {dayjs(event.startDate).format("MMM D, YYYY h:mm A")} -
                      {dayjs(event.endDate).format("MMM D, YYYY h:mm A")}
                    </p>
                    <p>{event.description}</p>
                    <div>
                      {event.confirmedUsers.length > 0 ? "Confirmed" : null}
                    </div>
                  </div>
                  <div className="container">
                    <div className="content-box-left-align-text">
                      <div className="card-container">
                        {event.children.map((child) => (
                          <div key={child._id} classname="card">
                            <p>{child.name}</p>
                            <p>{child.age}</p>
                            <p>{child.childFacts}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="card-container">
                    <div>
                      <button onClick={toggleModal} className="form-button">
                        CLOSE
                      </button>
                    </div>
                    <div>
                      <button onClick={handleConfirm} className="form-button">
                        Confirm Event
                      </button>
                      {/* <button onClick={handleDecline} className="form-button">
                          Decline Event
                        </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InvitedEventInfo;
