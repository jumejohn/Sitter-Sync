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

  //show the create event form or not
  const [createEvent, setCreateEvent] = useState(false);
  const handleCreateToggle = () => setCreateEvent(!createEvent);

  //add to google calendar
  const [useGoogle, setUseGoogle] = useState(false);

  //add a new event to the database
  const onSubmit = (data) => {
    dispatch(addEvent(data, selectedList));

    //change date format for Google Calendar
    const start = new Date(data.startDate).toISOString();
    const end = new Date(data.endDate).toISOString();

    //create variable to load the children details into the google calendar
    const kids = props.user.children.filter((child) =>
      selectedList.includes(child._id)
    );
    const addKids = kids.map(
      (kid) => `\n${kid.name}, ${kid.age}, ${kid.childFacts} \n`
    );
    if (useGoogle) {
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
    }

    //clear and hide the form
    reset();
    setCreateEvent(!createEvent);
    setSelectedList("");
    window.location.reload();
  };

  //Google Authentication if using the Google Calendar
  const handleItemClick = (e, name) => {
    if (name === "sign-in") {
      apiCalendar.handleAuthClick();
    } else if (name === "sign-out") {
      apiCalendar.handleSignoutClick();
    }
    if ("yes") {
      setUseGoogle(true);
    } else {
      setUseGoogle(false);
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
    <div className="row whitespace-container-row">
      <h3 className="h3">Upcoming Events</h3>
      <div className="row whitespace-container-row">
        <div className="container col">
          <div className=" content-box ">
            {props.user.events.length > 0 ? (
              <>
                <ul className=" card ">
                  <PendingEvents user={props.user} />
                </ul>
              </>
            ) : (
              <div>
                <h4>No Events Scheduled Yet</h4>
              </div>
            )}
          </div>
        </div>
        <div className="container col">
          <div className="content-box ">
            {!createEvent ? (
              <div className="whitespace-container-row">
                <div className="content-box">
                  <button
                    onClick={handleCreateToggle}
                    className="add-new-button"
                  >
                    Add New Event
                  </button>
                </div>
              </div>
            ) : (
              <div className="whitespace-container">
                <div className="content-box">
                  <div className="mb-3">
                    <p>
                      Do you want to add this event to your Google Calendar?
                    </p>
                    <button
                      onClick={(e) => handleItemClick(e, "sign-in")}
                      className="google-button"
                    >
                      Yes
                    </button>

                    <hr />
                  </div>

                  <div>
                    <div className="mb-3">
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
                    </div>
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
                    <div className="mb-3">
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
                    <div>
                      {props.user.children.map((child) => {
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
                    <div>
                      <button
                        onClick={handleSubmit(onSubmit)}
                        className="form-button"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={handleCreateToggle} className="form-button">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventsDisplay;
