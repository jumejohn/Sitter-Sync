import React from "react";
import axios from "axios";

export const deleteUser = (userId) => async (dispatch) => {
  const token = localStorage.token;
  const url = `/user/${userId}`;

  axios
    .delete(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
