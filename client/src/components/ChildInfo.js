import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { editChild } from "../actions/EditChild";
import { deleteChild } from "../actions/deleteChild";
import {
  Typography,
  TextField,
  Modal,
  Box,
  Paper,
  CardMedia,
  Button,
} from "@mui/material";

const ChildInfo = (props) => {
  const child = props.child;
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };
  const toggleEdit = () => {
    setEdit(!edit);
  };

  const onSubmit = (data) => {
    dispatch(editChild(data, child._id));
    reset();
    toggleEdit();
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
            <Box sx={{ p: 10, m: 5, border: "none" }}>
              <Paper sx={{ position: "relative", p: 10, width: "100%" }}>
                <TextField
                  variant="standard"
                  fullWidth
                  margin="normal"
                  type="name"
                  id="name"
                  label="Name"
                  defaultValue={child.name}
                  {...register("name")}
                />

                <TextField
                  variant="standard"
                  fullWidth
                  margin="normal"
                  type="age"
                  id="name"
                  label="Age:"
                  defaultValue={child.age}
                  {...register("age")}
                />

                <TextField
                  variant="standard"
                  fullWidth
                  margin="normal"
                  type="text"
                  id="childFacts"
                  multiline="true"
                  minRows="3"
                  label="Things you should know about me"
                  defaultValue={child.childFacts}
                  {...register("childFacts")}
                />

                <Box sx={{ mt: 2 }}>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    sx={{ m: 1 }}
                  >
                    Submit
                  </Button>

                  <Button
                    onClick={toggleEdit}
                    variant="contained"
                    sx={{ m: 1 }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Paper>
            </Box>
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

                    <Typography variant="h5" sx={{ p: 2 }}>
                      {child.childFacts}
                    </Typography>
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
