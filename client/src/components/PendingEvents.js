import { Card, CardHeader, Typography } from "@mui/material";
import React from "react";
import EventInfo from "./EventInfo";
import { Box } from "@mui/material";

const PendingEvents = (props) => {
  const events = props.user.events;

  return (
    <Box>
      {events ? (
        <>
          {events.map((event) => {
            return (
              <Card key={event._id}>
                <>
                  <EventInfo event={event} />
                </>
              </Card>
            );
          })}
        </>
      ) : null}
    </Box>
  );
};

export default PendingEvents;
