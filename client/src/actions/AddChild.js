import axios from "axios";

export const addChildren = (childData) => (dispatch) => {
  const userID = localStorage.userID;
  const token = localStorage.token;
  const url = `/user/${userID}/addchild`;
  const data = childData;
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .post(url, data, headers)
    .then(function (response) {
      console.log("AddChildren action", response.data);
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
};
