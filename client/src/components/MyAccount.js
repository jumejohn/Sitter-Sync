import React from "react";

const MyAccount = (props) => {
  const user = props.user;
  return (
    <>
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
              <li>{child.name}</li>
            ))}
          </div>
        </div>
        <div className="content-box">
          <div>
            Events:{" "}
            {user.events.map((event) => (
              <li>{event.title}</li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
