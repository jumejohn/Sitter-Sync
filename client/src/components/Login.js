import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { handleLogin } from "../actions/login";
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
    <div className="whitespace-container">
      <div></div>
      <div className="content-box">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="username"
            className="form-control"
            id="username"
            placeholder="name@example.com"
            {...register("username")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
            {...register("password")}
          />
        </div>
        <button type="submit" onClick={handleSubmit(onSubmit)}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
