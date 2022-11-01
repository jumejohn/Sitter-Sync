import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import ApiCalendar from "react-google-calendar-api";
import PendingEvents from "./PendingEvents";
import { addEvent } from "../actions/AddEvent";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const config = {
  clientId: CLIENT_ID,
  apiKey: API_KEY,
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

const apiCalendar = new ApiCalendar(config);

const EventsDisplay = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [createEvent, setCreateEvent] = useState(false);
  const handleCreateToggle = () => setCreateEvent(!createEvent);

  const onSubmit = (data) => {
    const start = new Date(data.startDate).toISOString();

    const end = new Date(data.endDate).toISOString();

    dispatch(addEvent(data, selectedList));
    const kids = props.user.children.filter((child) =>
      selectedList.includes(child._id)
    );
    const addKids = kids.map(
      (kid) => `\n${kid.name}, ${kid.age}, ${kid.childFacts} \n`
    );

    apiCalendar
      .createEvent({
        title: data.title,
        description: `${data.description}\n ${addKids}\n http://localhost:3000`,
        end: {
          dateTime: `${end}`,
        },
        start: {
          dateTime: `${start}`,
        },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    reset();
    setCreateEvent(!createEvent);
    setSelectedList("");
  };

  const handleItemClick = (e, name) => {
    if (name === "sign-in") {
      apiCalendar.handleAuthClick();
    } else if (name === "sign-out") {
      apiCalendar.handleSignoutClick();
    }
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
  return (
    <div>
      <button
        onClick={(e) => handleItemClick(e, "sign-in")}
        className="google-button"
      >
        Authorize Google Calendar
      </button>

      <div>
        {!createEvent ? (
          <button onClick={handleCreateToggle}>Add New Event</button>
        ) : (
          <div>
            <form>
              <div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder=" Event Title"
                    {...register("title")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text area"
                    className="form-control"
                    id="description"
                    placeholder=" Event Description"
                    {...register("description")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="dateTime-local"
                    className="form-control"
                    id=""
                    {...register("startDate")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">
                    End Date
                  </label>
                  <input
                    type="dateTime-local"
                    className="form-control"
                    id=""
                    {...register("endDate")}
                  />
                </div>
                <div>
                  {props.user.children.map((child) => {
                    return (
                      <div className="form-check" key={child._id}>
                        <input
                          className="form-check-input"
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
                    className="form-control"
                    id="invitedUsers"
                    placeholder="Invite Sitter Email Address"
                    {...register("invitedUsers")}
                  />
                </div>
                <div>
                  <button onClick={handleSubmit(onSubmit)}>Submit</button>
                </div>
              </div>
            </form>
            <button onClick={handleCreateToggle}>Cancel</button>
          </div>
        )}
      </div>
      <>
        {props.user.events ? (
          <>
            <PendingEvents user={props.user} />
          </>
        ) : (
          <h4>No Events Scheduled Yet</h4>
        )}
      </>
    </div>
  );
};
export default EventsDisplay;
