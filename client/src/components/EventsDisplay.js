import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import ApiCalendar from "react-google-calendar-api";
import PendingEvents from "./PendingEvents";
import { addEvent } from "../actions/AddEvent";
import InvitedEvents from "./InvitedEvents";
import { Box, Button, Card, Paper, Typography } from "@mui/material";

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
          description: `${data.description}\n ${addKids}\n https://sitter-synced.herokuapp.com/`,
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
    <Paper>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Upcoming Events
      </Typography>
      {!createEvent ? (
        <Paper>
          <Box sx={{ m: 2 }}>
            <Button onClick={handleCreateToggle} variant="contained">
              Add New Event
            </Button>
          </Box>
          <Box>
            <Card>
              {props.user.events.length > 0 ? (
                <>
                  <ul>
                    <PendingEvents user={props.user} />
                  </ul>
                </>
              ) : (
                <div>
                  <h4>No Events Scheduled Yet</h4>
                </div>
              )}
            </Card>

            <div className="container mb-3">
              <InvitedEvents user={props.user} />
            </div>
          </Box>
        </Paper>
      ) : (
        <div className="whitespace-container mb-3">
          <div className="content-box">
            {/* <div className="mb-3">
              <p>Do you want to add this event to your Google Calendar?</p>
              <p>
                Still in testing, needs to be cleard by google, so this won't
                work for you yet...
              </p>
              <button
                onClick={(e) => handleItemClick(e, "sign-in")}
                className="google-button"
              >
                Yes
              </button>
              <hr />
            </div> */}
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
              <Box>
                <Button
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  className="form-button"
                  sx={{ m: 1 }}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCreateToggle}
                  className="form-button"
                >
                  Cancel
                </Button>
              </Box>
            </div>
          </div>
        </div>
      )}
    </Paper>
  );
};
export default EventsDisplay;
