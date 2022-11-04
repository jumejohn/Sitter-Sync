import axios from "axios";
import React from "react";

export const confirmEvent = (eventId, userEmail) => async (dispatch) => {
  const userId = localStorage.userID;
  const token = localStorage.token;
  const data = { event: eventId, email: userEmail };
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  console.log(eventId);
  axios
    .put(`/user/${userId}/confirmevent`, data, headers)
    .then(function (response) {})
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
};
