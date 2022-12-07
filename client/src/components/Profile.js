import {
  AppBar,
  Card,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";

import { Outlet, Link } from "react-router-dom";

const Profile = (props) => {
  const user = props.user;
  if (!user) {
    return (
      <Paper>
        <Typography variant="h2" sx={{ m: 7, pt: 7 }}>
          Loading...
        </Typography>
      </Paper>
    );
  } else {
    return (
      <Paper>
        <Typography variant="h2" sx={{ m: 7, pt: 7 }}>
          Welcome to your page {user.firstname}
        </Typography>

        <Paper>
          <AppBar position="relative">
            <Tabs value={false} aria-label="nav tabs">
              <Container>
                <Typography variant="subtitle1">
                  <Tab
                    component={Link}
                    to="/profile/family"
                    label="Your Family"
                  />

                  <Tab
                    component={Link}
                    to="/profile/events"
                    label="Your Events"
                  />

                  <Tab component={Link} to="/profile/me" label="Your Account" />
                </Typography>
              </Container>
            </Tabs>
          </AppBar>
          <Card>
            <Outlet />
          </Card>
        </Paper>
      </Paper>
    );
  }
};

export default Profile;
