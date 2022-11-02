import axios from "axios";

export const editEvent = (eventData, id) => (dispatch) => {
  const userID = localStorage.userID;
  const token = localStorage.token;
  const eventId = id;
  const url = `/user/editevent/${eventId}`;
  const data = eventData;
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .put(url, data, headers)
    .then(function (response) {})
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
};
