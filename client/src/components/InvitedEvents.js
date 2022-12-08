import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvitedEvents } from "../actions/getInvitedEvents";
import InvitedEventInfo from "./InvitedEventInfo";
import { Box, Card, Typography } from "@mui/material";

const InvitedEvents = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvitedEvents(props.user.email));
  }, []);

  const shownEvents = useSelector(
    (state) => state.rootReducer.events.invitedEvents || null
  );
  console.log("shown", shownEvents);
  return (
    <Box sx={{ p: 4 }}>
      {shownEvents ? (
        <>
          {shownEvents.map((event) => {
            if (!event.confirmedUsers.length > 0) {
              return (
                <Card key={event._id} sx={{ m: 1 }}>
                  <InvitedEventInfo event={event} />
                </Card>
              );
            } else return null;
          })}
        </>
      ) : (
        <Card>
          <Typography variant="h4">No Events Scheduled Yet</Typography>
        </Card>
      )}
    </Box>
  );
};

export default InvitedEvents;
