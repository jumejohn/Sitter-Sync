import React, { useState } from "react";
import dayjs from "dayjs";
import { Card, Modal, Typography, Box, Button } from "@mui/material";
import { deleteEvent } from "../actions/deleteEvent";
import { useDispatch } from "react-redux";
import { editTask } from "../actions/editTask";
import EventForm from "./EventForm";
// import GoogleCalendarAdd from "./GoogleCalendarAdd";

const EventInfo = (props) => {
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
            <EventForm edit={edit} setEdit={setEdit} event={event} />
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
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  m: 1,
                }}
              >
                <Box>
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
                                m: 1,
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
                                m: 1,

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
                </Box>
                <Box
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
                </Box>
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
