import {
  Box,
  Button,
  Card,
  Container,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleSignUp } from "../actions/signup";

const SignUp = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log("signupform", data);
    dispatch(handleSignUp(data));
    reset();
    navigate("/login");
  };

  return (
    <Paper elevation={0}>
      <Container>
        <Typography variant="h3" sx={{ pt: 8 }}>
          Complete all fields to register a new account
        </Typography>
        <Card elevation={3} sx={{ m: 10 }}>
          <Box sx={{ mx: 20 }}>
            <TextField
              label="Email"
              fullWidth="true"
              required="true"
              variant="filled"
              type="email"
              size="small"
              id="email"
              margin="normal"
              placeholder="name@example.com"
              {...register("email")}
            />
          </Box>
          <Box sx={{ mx: 20 }}>
            <TextField
              label="Username"
              fullWidth="true"
              margin="normal"
              variant="filled"
              required="true"
              size="small"
              type="text"
              id="username"
              placeholder="username"
              {...register("username")}
            />
          </Box>
          <Box sx={{ mx: 20 }}>
            <TextField
              variant="filled"
              required="true"
              fullWidth="true"
              label="First Name"
              size="small"
              margin="normal"
              type="text"
              id="firstname"
              placeholder="First Name"
              {...register("firstname")}
            />
          </Box>
          <Box sx={{ mx: 20 }}>
            <TextField
              variant="filled"
              required="true"
              fullWidth="true"
              label="Last Name"
              size="small"
              margin="normal"
              type="text"
              id="lastname"
              placeholder="Last Name"
              {...register("lastname")}
            />
          </Box>
          <Box sx={{ mx: 20 }}>
            <TextField
              variant="filled"
              size="small"
              fullWidth="true"
              label="Password"
              margin="normal"
              type="password"
              id="password"
              placeholder="password"
              {...register("password")}
            />
          </Box>
          <Box sx={{ mx: 20, p: 4 }}>
            <Button
              variant="contained"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Sign Up
            </Button>
          </Box>
        </Card>
      </Container>
    </Paper>
  );
};

export default SignUp;
