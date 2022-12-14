import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import ApiCalendar from "react-google-calendar-api";
import PendingEvents from "./PendingEvents";
import { addEvent } from "../actions/AddEvent";
import InvitedEvents from "./InvitedEvents";
import {
  Box,
  Button,
  Card,
  Checkbox,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

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
  const { register, handleSubmit, reset, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "description",
  });
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
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ bgcolor: "Grey", height: "fit-content" }}
    >
      <Paper sx={{ m: 1, mb: 8, p: 10, width: "80%" }}>
        <Typography variant="h3" sx={{ mt: 2 }}>
          Upcoming Events
        </Typography>
        {!createEvent ? (
          <Box>
            <Box sx={{ m: 2 }}>
              <Button onClick={handleCreateToggle} variant="contained">
                Add New Event
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Card sx={{ p: 4, m: 2, width: "40%" }}>
                <Typography variant="h4" sx={{ pt: 2 }}>
                  Your upcoming events
                </Typography>
                {props.user.events.length > 0 ? (
                  <PendingEvents user={props.user} />
                ) : (
                  <Box sx={{ m: 2, p: 2 }}>
                    <Card sx={{ p: 2 }}>
                      <Typography variant="h5">
                        No Events Scheduled Yet
                      </Typography>
                    </Card>
                  </Box>
                )}
              </Card>

              <Card sx={{ p: 4, m: 2, width: "40%" }}>
                <Typography variant="h4" sx={{ pt: 2 }}>
                  Events Invited To
                </Typography>

                {props.user.events.length > 0 ? (
                  <InvitedEvents user={props.user} />
                ) : (
                  <Box sx={{ m: 2, p: 2 }}>
                    <Card sx={{ p: 2 }}>
                      <Typography variant="h5">
                        No Events Scheduled Yet
                      </Typography>
                    </Card>
                  </Box>
                )}
              </Card>
            </Box>
          </Box>
        ) : (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <div className="mb-3">
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
              </div>
              <Box sx={{ width: "100%", m: 2, mb: 7 }}>
                <Card sx={{ p: 1, m: 1 }}>
                  <TextField
                    variant="standard"
                    fullWidth
                    type="text"
                    margin="normal"
                    id="title"
                    placeholder=" Event Title"
                    {...register("title")}
                  />
                </Card>

                <Card
                  sx={{ p: 1, m: 1, display: "flex", flexDirection: "column" }}
                >
                  {fields.map((field, index) => {
                    return (
                      <>
                        <TextField
                          variant="standard"
                          fullWidth="true"
                          multiline="true"
                          minRows="3"
                          type="text area"
                          margin="normal"
                          id="description"
                          placeholder="Bed at 8, feed dog at 6..."
                          {...register(`description.${index}.value`)}
                        />

                        <Button
                          sx={{
                            mb: 2,
                            width: "25%",
                          }}
                          size="small"
                          variant="contained"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      </>
                    );
                  })}

                  <Button
                    variant="contained"
                    onClick={() => append()}
                    sx={{ maxWidth: "50%", alignSelf: "center" }}
                  >
                    Add Details or Tasks
                  </Button>
                </Card>

                <Card sx={{ p: 1, m: 1 }}>
                  <TextField
                    type="dateTime-local"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    id="startDate"
                    {...register("startDate")}
                  />
                </Card>
                <Card sx={{ p: 1, m: 1 }}>
                  <TextField
                    type="dateTime-local"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    id="endDate"
                    {...register("endDate")}
                  />
                </Card>

                <Card sx={{ p: 1, m: 1 }}>
                  {props.user.children.map((child) => {
                    return (
                      <Box
                        key={child._id}
                        sx={{ display: "flex", flexDirection: "row", m: 2 }}
                      >
                        <Checkbox
                          className="form-check-input form-input"
                          type="checkbox"
                          value={child._id}
                          margin="normal"
                          color="default"
                          id="flexCheckDefault"
                          onChange={handleChange}
                        />
                        <InputLabel htmlFor="flexCheckDefault" sx={{ ml: 1 }}>
                          {child.name}
                        </InputLabel>
                      </Box>
                    );
                  })}
                </Card>
                <Card sx={{ p: 1, m: 1 }}>
                  <TextField
                    variant="standard"
                    margin="normal"
                    type="email"
                    fullWidth
                    id="invitedUsers"
                    placeholder="Invite Sitter Email Address"
                    {...register("invitedUsers")}
                  />
                </Card>
                <Box>
                  <Button
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    sx={{ m: 1 }}
                  >
                    Submit
                  </Button>
                  <Button variant="contained" onClick={handleCreateToggle}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};
export default EventsDisplay;
