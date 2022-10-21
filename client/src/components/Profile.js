import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Profile = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.loggedIn;

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
    newUser();
  }, []);

  const newUser = async () => {
    await axios
      .get("/api/current_user", { withCredentials: true })
      .then(console.log)
      .then(localStorage.setItem("loggedIn", "true"))
      .catch(console.error);
  };

  return <div>Welcome to your dashboard{} </div>;
};

export default Profile;
