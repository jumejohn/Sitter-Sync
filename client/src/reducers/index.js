import { combineReducers } from "redux";
import reducerLogin from "../reducers/reducerLogin";
import reducerUser from "../reducers/reducerUser";
import reducerEvents from "./reducerEvents";

const rootReducer = combineReducers({
  token: reducerLogin,
  user: reducerUser,
  events: reducerEvents,
});
export default rootReducer;
