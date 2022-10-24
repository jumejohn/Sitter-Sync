import axios from "axios";

export const handleSignUp = (userData) => (dispatch) => {
  const url = `/user`;

  axios
    .post(url, userData)
    .then(function (response) {
      console.log("signup action", response.data);
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
};
