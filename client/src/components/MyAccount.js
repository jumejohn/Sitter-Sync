import {
  Box,
  Button,
  Typography,
  Paper,
  Card,
  TextField,
  ListItem,
  Modal,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { deleteUser } from "../actions/deleteUser";
import { editUser } from "../actions/editUser";
import { handleLogout } from "../actions/logout";

const MyAccount = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const user = props.user;
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };
  const handleClick = () => {
    dispatch(deleteUser(user._id));
    localStorage.removeItem("userID");

    dispatch(handleLogout());
  };
  const onSubmit = (data) => {
    dispatch(editUser(data));
    window.location.reload();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ bgcolor: "Grey" }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          m: 2,
        }}
      >
        {edit ? (
          <Box sx={{ m: 1, mb: 8 }}>
            <Typography variant="h4">Update Your Account Details</Typography>
            <Card sx={{ p: 2 }}>
              <TextField
                type="email"
                margin="normal"
                fullWidth
                label="Email"
                id="email"
                defaultValue={user.email}
                {...register("email")}
              />
            </Card>
            <Card sx={{ p: 2 }}>
              <TextField
                type="username"
                margin="normal"
                fullWidth
                label="Username"
                id="username"
                defaultValue={user.username}
                {...register("username")}
              />
            </Card>
            <Card sx={{ p: 2 }}>
              <TextField
                type="firstname"
                margin="normal"
                fullWidth
                label="First Name"
                id="firstname"
                defaultValue={user.firstname}
                {...register("firstname")}
              />
            </Card>
            <Card sx={{ p: 2 }}>
              <TextField
                type="lastname"
                margin="normal"
                fullWidth
                label="Last Name"
                id="lastname"
                defaultValue={user.lastname}
                {...register("lastname")}
              />
            </Card>
            <TextField
              hidden="true"
              type="password"
              id="password"
              defaultValue={user.password}
              {...register("password")}
            />
            <Box sx={{ m: 2 }}>
              <Button
                variant="contained"
                type="submit"
                sx={{ m: 1 }}
                onClick={handleSubmit(onSubmit)}
              >
                Update Details
              </Button>
              <Button variant="contained" sx={{ m: 1 }} onClick={toggleEdit}>
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ p: 2, m: 2 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              All About You
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Card sx={{ p: 6 }}>
                <Typography variant="body1">Email: {user.email}</Typography>
                <Typography variant="body1">
                  Username: {user.username}
                </Typography>
                <Typography variant="body1">
                  First Name: {user.firstname}
                </Typography>
                <Typography variant="body1">
                  Last Name: {user.lastname}
                </Typography>
              </Card>
              <Card sx={{ p: 6 }}>
                <Typography variant="h6">Children:</Typography>
                {user.children.map((child) => (
                  <ListItem key={child._id} style={{ listStyle: "none" }}>
                    <Typography variant="body1">{child.name}</Typography>
                  </ListItem>
                ))}
              </Card>
              <Card sx={{ p: 6 }}>
                <Typography variant="h6">Events:</Typography>
                {user.events.map((event) => (
                  <ListItem key={event._id} style={{ listStyle: "none" }}>
                    <Typography variant="body1">{event.title}</Typography>
                  </ListItem>
                ))}
              </Card>
              <Card sx={{ p: 6, display: "flex", flexDirection: "column" }}>
                <Button onClick={toggleEdit} variant="contained" sx={{ m: 1 }}>
                  Edit Account Details
                </Button>

                <Button
                  onClick={toggleModal}
                  variant="contained"
                  sx={{ color: "red", m: 1 }}
                >
                  Delete Account
                </Button>

                <Modal
                  open={open}
                  onClose={toggleModal}
                  contentLabel="Warning"
                  sx={{ m: 6, overflow: "auto" }}
                >
                  <Card sx={{ display: "flex", flexDirection: "column", p: 6 }}>
                    <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                      <Button
                        variant="text"
                        onClick={toggleModal}
                        sx={{
                          color: "black",
                          fontSize: "larger",
                          fontWeight: "800",
                        }}
                      >
                        X
                      </Button>
                    </Box>
                    <Typography variant="h3">
                      Are you sure you want to delete your account?
                    </Typography>
                    <Typography variant="h4">
                      This is irreversible and remove all access to your
                      account.
                    </Typography>
                    <Box sx={{ m: 1 }}>
                      <Button
                        variant="contained"
                        onClick={handleClick}
                        sx={{ m: 1 }}
                      >
                        Yes
                      </Button>
                      <Button variant="contained" onClick={toggleModal}>
                        No
                      </Button>
                    </Box>
                  </Card>
                </Modal>
              </Card>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default MyAccount;
