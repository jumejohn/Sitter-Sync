import { combineReducers } from "redux";
import reducerLogin from "../reducers/reducerLogin";

const rootReducer = combineReducers({
  token: reducerLogin,
});
export default rootReducer;
