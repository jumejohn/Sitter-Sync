import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { deleteUser } from "../actions/deleteUser";
import { handleLogout } from "../actions/logout";

const MyAccount = (props) => {
  const dispatch = useDispatch();
  const user = props.user;
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };
  const handleClick = () => {
    dispatch(deleteUser(user._id));
    localStorage.removeItem("userID");

    dispatch(handleLogout());
  };

  return (
    <div className="whitespace-container">
      <h1>All About You</h1>
      <div className="whitespace-container-row">
        <div className="content-box">
          <div>Email: {user.email}</div>
          <div>Username: {user.username}</div>
          <div>First Name: {user.firstname}</div>
          <div>Last Name: {user.lastname}</div>
        </div>
        <div className="content-box">
          <div>
            Children:{" "}
            {user.children.map((child) => (
              <li key={child._id}>{child.name}</li>
            ))}
          </div>
        </div>
        <div className="content-box">
          <div>
            Events:{" "}
            {user.events.map((event) => (
              <li key={event._id}>{event.title}</li>
            ))}
          </div>
        </div>
        <div className="whitespace-container">
          <button className="form-button">Edit Account Details</button>

          <div>
            <button className="form-button" onClick={toggleModal}>
              Delete Account
            </button>
          </div>
          <Modal
            isOpen={open}
            onRequestClose={toggleModal}
            contentLabel="Warning"
            className={"content-box-centered"}
          >
            <div>
              <h3>Are you sure you want to delete your account?</h3>
              <h4>
                This is irreversible and remove all access to your account.
              </h4>
              <button onClick={handleClick}>Yes</button>
              <button onClick={toggleModal}>No</button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
