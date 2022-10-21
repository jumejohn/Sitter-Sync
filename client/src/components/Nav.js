import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { handleLogout } from "../actions/logout";

const Nav = () => {
  const [user, setUser] = useState("");

  const loggedIn = localStorage.userID;
  useEffect(() => {
    setUser(!user);
  }, [loggedIn]);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      {!loggedIn ? (
        <Link to="/login">Login</Link>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

export default Nav;
