import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.userID;
    if (loggedIn) {
      navigate("/profile");
    }
  });

  return (
    <div>
      <h1>Welcome to Sitter-Synced</h1>

      <p>Are you ready to connect with your sitter?</p>
      <p>
        <a href="/login">Login</a> or <a href="/signup">Sign-Up</a>
      </p>
    </div>
  );
};

export default Home;
