import React from "react";
import axios from "axios";

export const deleteChild = (childId) => async (dipatch) => {
  const token = localStorage.token;
  const url = `/user/child/${childId}`;

  axios
    .delete(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
