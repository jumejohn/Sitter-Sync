import React, { useState } from "react";
import PendingEvents from "./PendingEvents";
import InvitedEvents from "./InvitedEvents";
import { Box, Button, Card, Paper, Typography } from "@mui/material";
import EventForm from "./EventForm";

const EventsDisplay = (props) => {
  const user = props.user;

  //show the create event form or not
  const [createEvent, setCreateEvent] = useState(false);
  const handleCreateToggle = () => setCreateEvent(!createEvent);

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
                {user.events.length > 0 ? (
                  <PendingEvents user={user} />
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

                {user.events.length > 0 ? (
                  <InvitedEvents user={user} />
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
          <EventForm
            setCreateEvent={setCreateEvent}
            createEvent={createEvent}
            user={user}
          />
        )}
      </Paper>
    </Box>
  );
};
export default EventsDisplay;
