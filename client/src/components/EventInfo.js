import React, { useState } from "react";
import dayjs from "dayjs";
import Modal from "react-modal";
import { deleteEvent } from "../actions/deleteEvent";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { editEvent } from "../actions/editEvent";

Modal.setAppElement("#root");

const EventInfo = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const event = props.event;
  const [edit, setEdit] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };
  const deleteAnEvent = () => {
    dispatch(deleteEvent(event._id));
    window.location.reload();
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const [selectedList, setSelectedList] = useState([]);
  const handleChange = (e) => {
    if (e.target.checked) {
      setSelectedList([...selectedList, e.target.value]);
    }
    if (!e.target.checked) {
      setSelectedList(selectedList.filter((x) => x !== e.target.value));
    }
  };
  const onSubmit = (data) => {
    dispatch(editEvent(data, event._id));
    reset();
    toggleEdit();
  };

  return (
    <>
      <>
        {event.confirmedUsers.length > 0 ? (
          <div className="card">
            <h6
              style={{ backgroundColor: "#84d9bf", border: "1px black solid" }}
            >
              CONFIRMED
            </h6>
            <h5 className="card-title family-button" onClick={toggleModal}>
              {dayjs(event.startDate).format("MMM D")} : {event.title}
            </h5>
          </div>
        ) : (
          <h5 className=" card-title family-button" onClick={toggleModal}>
            {dayjs(event.startDate).format("MMM D")} : {event.title}
          </h5>
        )}
      </>

      <Modal
        isOpen={open}
        onRequestClose={toggleModal}
        contentLabel={event.title}
        style={{
          content: { margin: "40px", display: "flex", height: "100%" },
        }}
      >
        <div>
          {edit ? (
            <div
              className="card mb-3 vw-100 p-3 container"
              style={{ margin: "20px" }}
            >
              <div className="row" style={{ overflow: "scroll" }}>
                <div className="whitespace-container">
                  <div className="whitespace-container-row">
                    <div className="content-box">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control form-input"
                        id="title"
                        placeholder=" Event Title"
                        {...register("title")}
                      />
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Special Instructions
                        </label>
                        <textarea
                          type="text area"
                          className="form-control form-input"
                          id="description"
                          placeholder="Bed at 8, feed dog at 6..."
                          {...register("description")}
                        />
                      </div>
                    </div>
                    <div className="content-box">
                      <div className="mb-3 ">
                        <label htmlFor="startDate" className="form-label">
                          Start Date
                        </label>
                        <input
                          type="dateTime-local"
                          className="form-control form-input"
                          id="startDate"
                          {...register("startDate")}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="endDate" className="form-label">
                          End Date
                        </label>
                        <input
                          type="dateTime-local"
                          className="form-control form-input"
                          id="endDate"
                          {...register("endDate")}
                        />
                      </div>
                    </div>
                    <div className="content-box">
                      <div>
                        {props.event.children.map((child) => {
                          return (
                            <div className="form-check" key={child._id}>
                              <input
                                className="form-check-input form-input"
                                type="checkbox"
                                value={child._id}
                                id="flexCheckDefault"
                                onChange={handleChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                              >
                                {child.name}
                              </label>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="invitedUsers" className="form-label">
                          Invite Sitter Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control form-input"
                          id="invitedUsers"
                          placeholder="Invite Sitter Email Address"
                          {...register("invitedUsers")}
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <div className="mb-3">
                          <button
                            onClick={handleSubmit(onSubmit)}
                            className="form-button"
                          >
                            Submit
                          </button>
                        </div>
                        <button onClick={toggleEdit} className="form-button">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="card mb-3 vw-100 p-3 container"
              style={{ margin: "20px" }}
            >
              <div className="row" style={{ overflow: "scroll" }}>
                <div className="whitespace-container">
                  <div className="whitespace-container-row">
                    <div className="container">
                      <div className="content-box">
                        <h2>{event.title}</h2>
                        <p>
                          {dayjs(event.startDate).format("MMM D, YYYY h:mm A")}{" "}
                          -{dayjs(event.endDate).format("MMM D, YYYY h:mm A")}
                        </p>
                        <p>{event.description}</p>
                        <div>
                          <span style={{ backgroundColor: "#84d9bf" }}>
                            {event.confirmedUsers.length > 0
                              ? "Confirmed"
                              : null}
                          </span>
                        </div>
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
                    <div className="container">
                      <div className="card-container">
                        <div>
                          <button onClick={toggleModal} className="form-button">
                            Close
                          </button>
                        </div>
                        <div>
                          <button onClick={toggleEdit} className="form-button">
                            Edit Event Details
                          </button>
                          {event.owner === localStorage.userID ? (
                            <button
                              onClick={deleteAnEvent}
                              className="form-button"
                            >
                              Delete Event?
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default EventInfo;
