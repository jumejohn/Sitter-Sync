import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { deleteUser } from "../actions/deleteUser";
import { editUser } from "../actions/editUser";
import { handleLogout } from "../actions/logout";

const MyAccount = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const user = props.user;
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };
  const handleClick = () => {
    dispatch(deleteUser(user._id));
    localStorage.removeItem("userID");

    dispatch(handleLogout());
  };
  const onSubmit = (data) => {
    dispatch(editUser(data));
    window.location.reload();
  };

  return (
    <div className="w-100 p-3">
      {edit ? (
        <div className="whitespace-container">
          <div className="content-box">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control form-input"
                id="email"
                defaultValue={user.email}
                {...register("email")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="username"
                className="form-control form-input"
                id="username"
                defaultValue={user.username}
                {...register("username")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                First Name
              </label>
              <input
                type="firstname"
                className="form-control form-input"
                id="firstname"
                defaultValue={user.firstname}
                {...register("firstname")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Last Name
              </label>
              <input
                type="lastname"
                className="form-control form-input"
                id="lastname"
                defaultValue={user.lastname}
                {...register("lastname")}
              />
            </div>
            <div className="mb-3">
              <input
                hidden="true"
                type="password"
                className="form-control "
                id="password"
                defaultValue={user.password}
                {...register("password")}
              />
            </div>
            <button
              className="form-button"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Update Details
            </button>
            <button className="form-button" onClick={toggleEdit}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
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
                  <li key={child._id} style={{ listStyle: "none" }}>
                    {child.name}
                  </li>
                ))}
              </div>
            </div>
            <div className="content-box">
              <div>
                Events:{" "}
                {user.events.map((event) => (
                  <li key={event._id} style={{ listStyle: "none" }}>
                    {event.title}
                  </li>
                ))}
              </div>
            </div>
            <div className="whitespace-container">
              <button className="form-button" onClick={toggleEdit}>
                Edit Account Details
              </button>

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
                  <button className="add-new-button" onClick={handleClick}>
                    Yes
                  </button>
                  <button className="add-new-button" onClick={toggleModal}>
                    No
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
