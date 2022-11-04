import React from "react";
import axios from "axios";

export const editUser = (userData) => async (dispatch) => {
  const userId = localStorage.userID;
  const token = localStorage.token;
  const url = `/user/${userId}`;
  const data = userData;
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .put(url, data, headers)
    .then(function (response) {})
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
};
