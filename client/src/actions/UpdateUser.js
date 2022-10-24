import { FETCH_USER } from "./fetchUser";
import axios from "./axios";

export const updateUser = (famdata) => (dispatch) => {
  const userID = localStorage.userID;
  const token = localStorage.token;
  axios
    .put(`/user/${userID}`, famdata, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(function (response) {
      console.log("updateuseraction", response.data);
      dispatch({
        type: FETCH_USER,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
