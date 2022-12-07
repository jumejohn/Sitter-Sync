import { Box, Container, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sizing } from "@mui/system";
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.userID;
    if (loggedIn) {
      navigate("/profile");
    }
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ bgcolor: "Grey", height: "fit-content" }}
    >
      <Paper sx={{ m: 20 }}>
        <Box display="flex" alignItems="center" justifyContent="center"></Box>
        <Box sx={{ p: 15 }}>
          <Typography variant="h3">Welcome to Sitter-Synced</Typography>
          <Box>
            <Typography variant="h4">
              Are you ready to connect with your sitter?
            </Typography>
            <p>
              <a href="/login">Login</a> or <a href="/signup">Sign-Up</a>
            </p>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
