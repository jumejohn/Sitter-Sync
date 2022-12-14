import axios from "axios";

export const editChild = (childData, id) => (dispatch) => {
  const userID = localStorage.userID;
  const token = localStorage.token;
  const childId = id;
  const url = `/user/editchild/${childId}`;
  const data = childData;
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
