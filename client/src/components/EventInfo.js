import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Card,
  Modal,
  Typography,
  Box,
  TextField,
  Checkbox,
  Button,
  InputLabel,
} from "@mui/material";
import { deleteEvent } from "../actions/deleteEvent";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { editEvent } from "../actions/editEvent";

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
      <Box sx={{ p: 2 }} className="clickText">
        {event.confirmedUsers.length > 0 ? (
          <Card>
            <Typography variant="h6" sx={{ backgroundColor: "#84d9bf" }}>
              CONFIRMED
            </Typography>
            <Typography variant="h5" onClick={toggleModal}>
              {dayjs(event.startDate).format("MMM D")} : {event.title}
            </Typography>
          </Card>
        ) : (
          <Typography variant="h5" onClick={toggleModal}>
            {dayjs(event.startDate).format("MMM D")} : {event.title}
          </Typography>
        )}
      </Box>

      <Modal
        open={open}
        onClose={toggleModal}
        contentLabel={event.title}
        sx={{ overflow: "auto" }}
      >
        <Card sx={{ m: 5, p: 2 }}>
          {edit ? (
            <Box
              sx={{
                m: 2,
                p: 2,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
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

              <Card sx={{ p: 1, m: 1 }}>
                <TextField
                  variant="standard"
                  fullWidth="true"
                  multiline="true"
                  minRows="3"
                  type="text area"
                  margin="normal"
                  id="description"
                  placeholder="Bed at 8, feed dog at 6..."
                  {...register("description")}
                />
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
                {props.event.children.map((child) => {
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
                <Button variant="contained" onClick={toggleEdit}>
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ m: 2, mb: 7 }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h2">{event.title} </Typography>
                <Typography variant="body1">
                  {dayjs(event.startDate).format("MMM D, YYYY h:mm A")} -
                  {dayjs(event.endDate).format("MMM D, YYYY h:mm A")}
                </Typography>
                <Typography variant="body1">{event.description}</Typography>

                <Typography
                  variant="h5"
                  align="center"
                  sx={{ backgroundColor: "#84d9bf", width: "100%" }}
                >
                  {event.confirmedUsers.length > 0 ? "Confirmed" : null}
                </Typography>
              </Card>
              <Card sx={{ m: 1 }}>
                {event.children.map((child) => (
                  <Card
                    key={child._id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      m: 1,
                    }}
                  >
                    <Typography variant="h5">{child.name}</Typography>
                    <Typography variant="body1">Age: {child.age}</Typography>
                    <Typography variant="body1">
                      Things to know about me:
                    </Typography>
                    <Typography variant="body1">{child.childFacts}</Typography>
                  </Card>
                ))}
              </Card>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Button onClick={toggleModal} variant="contained" sx={{ m: 1 }}>
                  Close
                </Button>

                <Button onClick={toggleEdit} variant="contained" sx={{ m: 1 }}>
                  Edit Event Details
                </Button>
                {event.owner === localStorage.userID ? (
                  <Button
                    onClick={deleteAnEvent}
                    variant="contained"
                    sx={{ m: 1, color: "red" }}
                  >
                    Delete Event
                  </Button>
                ) : null}
              </Box>
            </Box>
          )}
        </Card>
      </Modal>
    </>
  );
};

export default EventInfo;
