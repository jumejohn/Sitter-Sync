import axios from "axios";
export const deleteEvent = (eventId) => async (dispatch) => {
  const token = localStorage.token;
  const url = `/user/event/${eventId}`;

  axios
    .delete(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
