import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { handleLogin } from "../actions/login";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    const loggedIn = localStorage.loggedIn;
    if (loggedIn) {
      navigate("/user/profile");
    }
  }, []);
  const onSubmit = (data) => {
    dispatch(handleLogin(data));
  };

  return (
    <>
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
    </>

    // <>
    //   <button>
    //     <a href="http://localhost:8000/auth/google">Login with Google</a>
    //   </button>
    // </>
  );
};

export default Login;
