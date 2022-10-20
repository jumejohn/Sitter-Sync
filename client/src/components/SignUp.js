import React from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit (data) => {
    console.log("signupform", data);
    reset();
  }

  return (
    <>
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
        <label htmlFor="firstName" className="form-label">
          First Name
        </label>
        <input
          type="firstName"
          className="form-control"
          id="firstName"
          placeholder="First Name"
          {...register("firstName")}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <input
          type="lastName"
          className="form-control"
          id="lastName"
          placeholder="Last Name"
          {...register("lastName")}
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
      <button type="submit" onClick={handleSubmit(onSubmit)}/>
    </>
  );
};

export default SignUp;
