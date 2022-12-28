import React, { useState } from "react";
import ChildrenDisplay from "./ChildrenDisplay";
import { Box, Card, Paper, Typography, Container, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import ChildForm from "./ChildForm";

const FamilyDisplay = (props) => {
  const [createFam, setCreateFam] = useState(false);
  const handleCreateToggle = () => setCreateFam(!createFam);

  return (
    <Paper elevation={0} sx={{ m: 5, mb: 10 }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Current Family
      </Typography>
      <Box display="flex" flexDirection={"row"}>
        <Container sx={{ maxWidth: "50%" }}>
          <Card elevation={1}>
            <ChildrenDisplay user={props.user} className="card-container" />
          </Card>
        </Container>
        <Container sx={{ mb: 8, maxWidth: "50%" }}>
          {createFam ? (
            <Card elevation={1} sx={{ boxShadow: 1 }}>
              <ChildForm createFam={createFam} handleCreateToggle={handleCreateToggle} />
            </Card>
          ) : (
            <Card elevation={0}>
              <Box sx={{ p: 10 }}>
                <Button
                  variant="contained"
                  onClick={handleCreateToggle}
                  className="add-new-button"
                  sx={{
                    color: grey[700],
                    fontWeight: "800",
                    m: 1,
                    letterSpacing: 1,
                    fontSize: 18,
                  }}
                >
                  Add New Child
                </Button>
              </Box>
            </Card>
          )}
        </Container>
      </Box>
    </Paper>
  );
};

export default FamilyDisplay;
