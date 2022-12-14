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
  ToggleButton,
} from "@mui/material";
import { deleteEvent } from "../actions/deleteEvent";
import { useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { editEvent } from "../actions/editEvent";
import { editTask } from "../actions/editTask";

const EventInfo = (props) => {
  const { register, handleSubmit, reset, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "description",
  });
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

  const markDone = (e) => {
    dispatch(editTask(e.value, event._id));
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
              <Card sx={{ p: 1, m: 1 }}>
                <TextField
                  variant="standard"
                  fullWidth
                  type="text"
                  margin="normal"
                  id="title"
                  defaultValue={event.title}
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
                        fullWidth
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
                  defaultValue={event.startDate}
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
                  defaultValue={event.endDate}
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
                  defaultValue={event.invitedUsers}
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
              <Button
                onClick={toggleModal}
                variant="text"
                size="large"
                sx={{
                  m: 2,
                  p: 2,
                  position: "absolute",

                  right: "1em",
                  top: "1em",
                  color: "black",
                  fontSize: "larger",
                }}
              >
                X
              </Button>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  m: 1,
                }}
              >
                <Typography variant="h2">{event.title} </Typography>

                <Typography variant="h5">
                  {dayjs(event.startDate).format("MMM D, YYYY h:mm A")} -
                  {dayjs(event.endDate).format("MMM D, YYYY h:mm A")}
                </Typography>
                <Typography variant="h5">Details:</Typography>
                <Box
                  sx={{
                    backgroundColor: "lightblue",
                    border: "black 1px solid",
                  }}
                >
                  {event.description.map((task) => {
                    return (
                      <>
                        {task.done === true ? (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              m: 2,
                              border: "1px black solid",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              variant="h5"
                              sx={{ m: 2, textDecoration: "line-through" }}
                            >
                              {task.value}
                            </Typography>
                            <Button
                              value={task._id}
                              size="small"
                              variant="contained"
                              onClick={(e) => markDone(e.target)}
                              sx={{
                                width: "1rem",
                                backgroundColor: "lightgray",
                              }}
                            >
                              Not Done
                            </Button>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              m: 2,

                              justifyContent: "space-between",
                              border: "1px black solid",
                            }}
                          >
                            <Typography variant="h5" sx={{ m: 2 }}>
                              {task.value}
                            </Typography>{" "}
                            <Button
                              value={task._id}
                              size="small"
                              variant="contained"
                              onClick={(e) => markDone(e.target)}
                              sx={{ width: "1rem" }}
                            >
                              Done
                            </Button>
                          </Box>
                        )}
                      </>
                    );
                  })}
                </Box>

                <Typography
                  variant="h5"
                  align="center"
                  sx={{ backgroundColor: "#84d9bf", width: "100%" }}
                >
                  {event.confirmedUsers.length > 0 ? "Confirmed" : null}
                </Typography>
              </Card>
              <Card
                sx={{
                  m: 1,
                  p: 2,
                }}
              >
                <Typography align="center" variant="h4">
                  Children:
                </Typography>
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
                    <Typography variant="h6">
                      Things to know about me:
                    </Typography>

                      {child.childFacts.map((fact) => {
                        console.log(fact);
                        return (
                          <Typography variant="h5" sx={{ p: 2 }}>
                            {fact.value}
                          </Typography>
                        );
                      })}

                  </Card>
                ))}
              </Card>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
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
