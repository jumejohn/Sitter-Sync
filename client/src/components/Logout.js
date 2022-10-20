import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const loggedIn = localStorage.loggedIn;
    if (!loggedIn) {
      navigate("/login");
    }
  }, []);

  const logout = () => {
    localStorage.clear();
  };

  return (
    <>
      <button onClick={logout}>
        <a href="http://localhost:8000/api/logout">Logout</a>
      </button>
    </>
  );
};

export default Logout;
