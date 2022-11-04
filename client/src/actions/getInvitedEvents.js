import axios from "axios";
export const FETCH_EVENT = "FETCH_EVENTS";
export const getInvitedEvents = (userEmail) => async (dispatch) => {
  const userId = localStorage.userID;
  const url = `/user/${userId}/invitedevents`;
  const token = localStorage.token;
  const data = { email: userEmail };
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  await axios
    .put(url, data, headers)
    .then(function (response) {
      console.log(response.data);
      dispatch({
        type: FETCH_EVENT,
        payload: response.data,
      });
    })
    .catch(async (error) => {
      console.log(error);
    });
};
