import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { handleLogin } from "../actions/login";
import {
  Box,
  Button,
  Card,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    const loggedIn = localStorage.userID;
    if (loggedIn) {
      navigate("/profile");
    }
  }, []);
  const onSubmit = (data) => {
    dispatch(handleLogin(data));
    reset();
    navigate("/profile");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ bgcolor: "Grey", height: "fit-content" }}
    >
      <Paper sx={{ m: 20, boxShadow: 4 }}>
        <Box sx={{ p: 4 }}>
          <Typography variant="h3" sx={{ m: 1, mb: 2 }}>
            Login
          </Typography>
          <Card sx={{ p: 4, boxShadow: 2 }}>
            <TextField
              variant="filled"
              margin="normal"
              type="username"
              className="form-control"
              id="username"
              placeholder="username"
              {...register("username")}
            />
            <TextField
              variant="filled"
              margin="normal"
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              {...register("password")}
            />
            <Box sx={{ m: 2 }}>
              <Button
                variant="contained"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                <Typography variant="body1" sx={{ color: "#000000" }}>
                  Sign In
                </Typography>
              </Button>
              <Typography> or </Typography>
              <Link href="/signup">
                <Typography variant="body1" sx={{ color: "#000000" }}>
                  Sign-Up
                </Typography>
              </Link>
            </Box>
          </Card>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
