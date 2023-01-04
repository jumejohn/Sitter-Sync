// import { Alert, Button, Typography } from "@mui/material";
// import React, { useState } from "react";
// import ApiCalendar from "react-google-calendar-api";

// const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
// const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

// const config = {
//   clientId: CLIENT_ID,
//   apiKey: API_KEY,
//   scope: "https://www.googleapis.com/auth/calendar",
//   discoveryDocs: [
//     "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
//   ],
// };

// const apiCalendar = new ApiCalendar(config);
// const GoogleCalendarAdd = (props) => {
//   const event = props.event;
//   const [google, setGoogle] = useState(false);
//   const [useGoogle, setUseGoogle] = useState(false);

//   //change date format for Google Calendar
//   const start = new Date(event.startDate).toISOString();
//   const end = new Date(event.endDate).toISOString();

//   //create variable to load the children details into the google calendar
//   const kids = event.children;
//   const addKids = kids.map(
//     (kid) => `\n${kid.name}, ${kid.age}, ${kid.childFacts} \n`
//   );
//   const addGoogleEvent = (event) => {
//     apiCalendar
//       .createEvent({
//         title: event.title,
//         description: `${event.description}\n ${addKids}\n https://sitter-synced.herokuapp.com/`,
//         end: {
//           dateTime: `${end}`,
//         },
//         start: {
//           dateTime: `${start}`,
//         },
//       })
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     setUseGoogle(false);
//   };

//   //   Google Authentication if using the Google Calendar
//   const handleItemClick = (e, name) => {
//     if (name === "sign-in") {
//       apiCalendar.handleAuthClick().then(addGoogleEvent(event));
//     } else if (name === "sign-out") {
//       apiCalendar.handleSignoutClick();
//     }
//     if ("yes") {
//       setUseGoogle(true);
//     } else {
//       setUseGoogle(false);
//     }
//   };

//   const toggleGoogle = () => {
//     setGoogle(!google);
//   };
//   return (
//     <>
//       {google ? (
//         <Alert>
//           <Typography variant="body1">
//             Do you want to add this event to your Google Calendar?
//           </Typography>
//           <Button
//             onClick={(e) => handleItemClick(e, "sign-in")}
//             variant="contained"
//           >
//             Yes
//           </Button>
//           <Button variant="contained" onClick={toggleGoogle}>
//             No
//           </Button>
//         </Alert>
//       ) : (
//         <Button variant="contained" onClick={toggleGoogle}>
//           Add to Google
//         </Button>
//       )}
//     </>
//   );
// };

// export default GoogleCalendarAdd;
