import axios from "axios";

export const addEvent = (eventData, children) => (dispatch) => {
  const userID = localStorage.userID;
  const token = localStorage.token;
  const url = `/user/${userID}/event`;
  const data = {
    description: eventData.description,
    startDate: eventData.startDate,
    endDate: eventData.endDate,
    owner: eventData.owner,
    children: children,
    invitedUsers: eventData.invitedUsers,
  };
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  axios
    .post(url, data, headers)

    .catch(function (error) {
      console.log(error);
      alert(error);
    });
};
