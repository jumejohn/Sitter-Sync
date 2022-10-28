import axios from "axios";
export const FETCH_EVENT = "FETCH_EVENT";
export const fetchEvent = (eventId) => async (dispatch) => {
  const token = localStorage.token;
  const url = `/user/event/${eventId}`;

  axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(function (response) {
      console.log("fetcheventaction", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
