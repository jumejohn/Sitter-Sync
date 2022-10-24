import axios from "axios";

export const addChildren = (childData) => (dispatch) => {
  const userID = localStorage.userID;
  const token = localStorage.token;
  const url = `/user/${userID}`;
  const data = { name: childData.name, age: childData.age };

  axios
    .put(url, data)
    .then(function (response) {
      console.log("AddChildren action", response.data);
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
};
