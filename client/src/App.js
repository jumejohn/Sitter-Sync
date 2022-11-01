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

function App() {
  const dispatch = useDispatch();

  const token = localStorage.token;
  useEffect(() => {
    dispatch(fetchUser(token));
  }, [dispatch, token]);

  const user = useSelector(
    (state) => state.rootReducer.user.currentUser || null
  );

  return (
    <div className="App">
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
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
