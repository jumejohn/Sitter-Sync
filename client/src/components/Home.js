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
    <div style={{ backgroundColor: "lightgray" }} className="w-100 p-3">
      <div className="whitespace-container " style={{ marginTop: "80px" }}>
        <div className="content-box">
          <div className="banner">
            <h1>Welcome to Sitter-Synced</h1>
          </div>
          <div>
            <h4>Are you ready to connect with your sitter?</h4>
            <p>
              <a href="/login">Login</a> or <a href="/signup">Sign-Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
