import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./actions/fetchUser";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import FamilyDisplay from "./components/FamilyDisplay";
import EventsDisplay from "./components/EventsDisplay";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import MyAccount from "./components/MyAccount";
import { Paper } from "@mui/material";

function App() {
  const dispatch = useDispatch();

  const token = localStorage.token;
  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [dispatch, token]);

  const user = useSelector(
    (state) => state.rootReducer.user.currentUser || null
  );

  return (
    <Paper className="App">
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile user={user} />}>
          <Route
            path="/profile/family"
            element={<FamilyDisplay user={user} />}
          />
          <Route
            path="/profile/events"
            element={<EventsDisplay user={user} />}
          />
          <Route path="/profile/me" element={<MyAccount user={user} />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      <Footer />
    </Paper>
  );
}

export default App;
