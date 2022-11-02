import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./styles.css";
import { handleLogout } from "../actions/logout";

const Nav = () => {
  const dispatch = useDispatch();

  const loggedIn = localStorage.userID;
  const onLogout = () => {
    localStorage.removeItem("userID");
    dispatch(handleLogout());
  };

  return (
    <nav className="navbar fixed-top top-nav">
      <div className="container">
        <div className="row">
          <div>
            <div className="navbar">
              <Link className="link" to="/">
                Home
              </Link>

              <Link className="link" to="/about">
                About
              </Link>
            </div>
          </div>
        </div>

        {!loggedIn ? (
          <Link to="/login">
            <button className="nav-button">Login</button>
          </Link>
        ) : (
          <>
            <button className="nav-button" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
