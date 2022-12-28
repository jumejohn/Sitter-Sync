import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteChild } from "../actions/deleteChild";
import ChildForm from "./ChildForm";
import {
  Typography,
  Modal,
  Box,
  Paper,
  CardMedia,
  Button,
} from "@mui/material";

const ChildInfo = (props) => {
  const child = props.child;

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };
  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleClick = () => {
    dispatch(deleteChild(child._id));
    window.location.reload();
  };

  return (
    <>
      <Typography variant="h4" onClick={toggleModal}>
        {child.name}, {child.age}
      </Typography>
      <Modal
        open={open}
        onClose={toggleModal}
        contentLabel={child.name}
        sx={{ margin: "40px", display: "flex", overflow: "auto" }}
      >
        <Box>
          {edit ? (
            <ChildForm child={child} toggleEdit={toggleEdit} />
          ) : (
            <Box sx={{ display: "flex", m: 5 }}>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  overflow: "auto",
                  maxHeight: "100%",
                }}
              >
                <Box sx={{ m: 10 }}>
                  <CardMedia
                    component="img"
                    src="https://source.unsplash.com/random"
                    alt={child.name}
                    height="600px"
                  />
                </Box>
                <Box sx={{ m: 10 }}>
                  <Typography variant="h3" sx={{ p: 2 }}>
                    {child.name}
                  </Typography>
                  <Typography variant="h4" sx={{ p: 2 }}>
                    Age: {child.age}
                  </Typography>
                  <Box sx={{ m: 2 }}>
                    <Typography variant="h4" sx={{ p: 2 }}>
                      Notes about me:
                    </Typography>

                    {child.childFacts.map((fact) => {
                      console.log(fact);
                      return (
                        <Typography variant="h5" sx={{ p: 2 }} key={fact.value}>
                          {fact.value}
                        </Typography>
                      );
                    })}
                  </Box>
                  <Box>
                    <Button
                      onClick={toggleEdit}
                      variant="contained"
                      sx={{ m: 2 }}
                    >
                      Edit Details
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleClick}
                      sx={{ m: 2, backgroundColor: "red" }}
                    >
                      Delete Child
                    </Button>
                  </Box>

                  <Button
                    onClick={toggleModal}
                    variant="contained"
                    sx={{ m: 2 }}
                  >
                    Close
                  </Button>
                </Box>
                <Box sx={{ position: "relative", Top: 0, right: 0 }}>
                  <Button
                    onClick={toggleModal}
                    variant="text"
                    sx={{ color: "black" }}
                  >
                    X
                  </Button>
                </Box>
              </Paper>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ChildInfo;
