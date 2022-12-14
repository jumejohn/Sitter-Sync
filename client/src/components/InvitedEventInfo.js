import React, { useState } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { confirmEvent } from "../actions/confirmEvent";
import { Box, Button, Card, Typography, Modal } from "@mui/material";

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
  /*   const handleDecline = () => {};
   */ return (
    <Box sx={{ p: 2 }} className="clickText">
      <Card sx={{ p: 2 }}>
        <Typography variant="h5" onClick={toggleModal}>
          {dayjs(event.startDate).format("MMM D")} : {event.title}
        </Typography>
      </Card>

      <Modal
        open={open}
        onClose={toggleModal}
        contentLabel={event.title}
        sx={{
          p: 4,
          m: 10,
          overflow: "auto",
        }}
      >
        <Card sx={{ m: 5, p: 2 }}>
          <Box
            sx={{
              m: 2,
              p: 2,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h2" align="center">
              {event.title}
            </Typography>
            <Typography variant="h5" align="center">
              {dayjs(event.startDate).format("MMM D, YYYY h:mm A")} -
              {dayjs(event.endDate).format("MMM D, YYYY h:mm A")}
            </Typography>

            {event.description.map((task) => {
              return (
                <Typography variant="h5" align="center">
                  {task.value}
                </Typography>
              );
            })}

            <Box>{event.confirmedUsers.length > 0 ? "Confirmed" : null}</Box>

            <Box>
              {event.children.map((child) => (
                <Card key={child._id} sx={{ m: 1, p: 2 }}>
                  <Typography variant="h5" align="center">
                    {child.name}
                  </Typography>
                  <Typography variant="body1" align="center">
                    Age: {child.age}
                  </Typography>
                  <Typography variant="h6" align="center">
                    Things to know about me:
                  </Typography>
                  {child.childFacts.map((fact) => {
                    console.log(fact);
                    return (
                      <Typography variant="h6" align="center" sx={{ p: 2 }}>
                        {fact.value}
                      </Typography>
                    );
                  })}
                </Card>
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={toggleModal} variant="contained" sx={{ m: 1 }}>
                CLOSE
              </Button>

              <Button onClick={handleConfirm} variant="contained" sx={{ m: 1 }}>
                Confirm Event
              </Button>
              {/* <button onClick={handleDecline} className="form-button">
                          Decline Event
                        </button> */}
            </Box>
          </Box>
        </Card>
      </Modal>
    </Box>
  );
};

export default InvitedEventInfo;
