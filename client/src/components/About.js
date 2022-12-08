import React from "react";
import { Box, List, ListItem, Paper, Typography } from "@mui/material";

const About = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ bgcolor: "Grey", height: "fit-content" }}
    >
      <Paper sx={{ m: 20, p: 10 }}>
        <Typography variant="h4" sx={{ pb: 5 }}>
          What is Sitter-Synced?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">
            What is the most annoying thing about inviting someone to watch your
            loved ones?
          </Typography>
          <Typography variant="h6">
            Let's be honest, there isn't just one, there are several things that
            are difficult:
          </Typography>
          <Box sx={{ maxWidth: "40%", p: 2 }}>
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ListItem>
                <Typography variant="body1">
                  writing a list of things that the sitter needs to know each
                  time you go out...
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1">
                  communicating important things like medications or food
                  restrictions...
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1">
                  knowing that things are being done while you are gone...
                </Typography>
              </ListItem>
            </List>
          </Box>

          <Typography variant="h6">
            Sitter Synced is all about making these things easier.
          </Typography>
          <Typography variant="body1">
            Using Sitter Synced, you can set a new babysitting event, add all
            relevant information, and even set the event to your Google
            Calendar.(coming soon...)
          </Typography>
          <Typography variant="body1">
            This event can then be sent to your babysitter, giving them all the
            relevant information.
          </Typography>

          <Typography variant="body1">
            Set up a list as well allowing your sitter to clear tasks as they
            happen. No more do you need to worry about if your kid go their
            meds, or if the dog got fed on time.
          </Typography>
          <Typography variant="body1">
            Set everything right here, and all the information is passed and
            available to the babysitter. Your sitter can update the checklist
            throughout your time away.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default About;
