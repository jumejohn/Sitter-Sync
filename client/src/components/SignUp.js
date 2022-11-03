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
    <div>
      <h1 className="welcome-tagline">
        Complete all fields to register a new account
      </h1>
      <div className="whitespace-container">
        <div className="content-box">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              {...register("email")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="username"
              className="form-control"
              id="username"
              placeholder="username"
              {...register("username")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
            <input
              type="firstname"
              className="form-control"
              id="firstname"
              placeholder="First Name"
              {...register("firstname")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="lastname"
              className="form-control"
              id="lastname"
              placeholder="Last Name"
              {...register("lastname")}
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
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
