import axios from "axios";

export const createFamily = (userData) => (dispatch) => {
  const userID = localStorage.userID;
  const url = `/family`;
  const data = { name: data.name, parent: userID };

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
