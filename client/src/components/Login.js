import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const loggedIn = localStorage.loggedIn;
    if (loggedIn) {
      navigate("/user/profile");
    }
  }, []);

  return (
    <>
      <button>
        <a href="http://localhost:8000/auth/google">Login with Google</a>
      </button>
    </>
  );
};

export default Login;
