import { BottomNavigation, Container, Paper, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        position="absolute"
        sx={{ background: "#84d9bf", borderTop: "2px solid black" }}
      >
        <Container>
          <Typography variant="subtitle1">Sitter-Synced</Typography>
          <Typography variant="subtitle1">
            • connecting you to your sitter • making your time away easier •
          </Typography>
        </Container>
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;
