import axios from "axios";

export const handleSignUp = (userData, callback) => (dispatch) => {
  const url = `/user`;

  axios
    .post(url, userData)
    .then(function (response) {
      console.log("signup action", response.data);
      callback();
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
};
