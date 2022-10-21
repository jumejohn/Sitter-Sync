import axios from "axios";
export const FETCH_USER = "FETCH_USER";
export const fetchUser = (token) => async (dispatch) => {
  const userID = localStorage.userID;
  const url = `/user/${userID}`;

  axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(function (response) {
      console.log("fetchuseraction", response.data);
      dispatch({
        type: FETCH_USER,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
      //   localStorage.clear();
      //   window.location.href = "/login";
    });
};
