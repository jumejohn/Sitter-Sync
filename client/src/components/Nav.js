import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./styles.css";
import { handleLogout } from "../actions/logout";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Tabs, Tab, Button } from "@mui/material";
import { grey } from "@mui/material/colors";

const Nav = () => {
  const dispatch = useDispatch();

  const loggedIn = localStorage.userID;
  const onLogout = () => {
    localStorage.removeItem("userID");
    dispatch(handleLogout());
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="lg">
        <Tabs value={false} aria-label="nav tabs">
          <Container align="left">
            <Tab component={Link} label="Home" to="/" />
            <Tab component={Link} label="About" to="/about" />
          </Container>
          <Container align="right" justify="center">
            {!loggedIn ? (
              <Tab component={Link} label="LOGIN" to="/login" />
            ) : (
              <Button
                align="cener"
                variant="text"
                onClick={onLogout}
                sx={{
                  color: grey[700],
                  fontWeight: "800",
                  m: 1,
                  letterSpacing: 1,
                  fontSize: 18,
                }}
              >
                LOGOUT
              </Button>
            )}
          </Container>
        </Tabs>
      </Container>
    </AppBar>
  );
};

export default Nav;
