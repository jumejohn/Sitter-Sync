import axios from "axios";
export const HANDLE_LOGIN = "HANDLE_LOGIN";
export const handleLogin = (userData) => (dispatch) => {
  const url = `/auth/signin`;

  axios
    .post(url, userData)
    .then(function (response) {
      dispatch({
        type: HANDLE_LOGIN,
        payload: response.data,
      });
      //shows the data returned in the payload for dev purposes
      console.log("login action", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userID", response.data.userID);
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
};
