import axios from "axios";

export const editTask = (id, eventId) => (dispatch) => {
  const userID = localStorage.userID;
  const token = localStorage.token;
  const taskId = id;
  const url = `/user/edittask/${taskId}`;
  const data = { eventId };
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .put(url, data, headers)
    .then(function (response) {
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
};
