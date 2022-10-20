import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [user, setUser] = useState("");

  const loggedIn = localStorage.loggedIn;
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
        <Link to="/logout">Logout</Link>
      )}
    </nav>
  );
};

export default Nav;
