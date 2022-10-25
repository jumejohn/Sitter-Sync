import axios from "axios";

export const addEvent = (eventData) => (dispatch) => {
  const userID = localStorage.userID;
  const token = localStorage.token;
  const url = `/user/${userID}/event`;
  const data = eventData;
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .post(url, data, headers)
    .then(function (response) {
      console.log("AddEvent action", response.data);
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
};
