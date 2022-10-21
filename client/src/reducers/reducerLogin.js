import { HANDLE_LOGIN } from "../actions/login";
import { HANDLE_LOGOUT } from "../actions/logout";
// We shouldn't have too many different kinds of actions
// so we shouldn't need separate reducers?
const initialState = {
  token: localStorage.token,
};

const reducerLogin = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_LOGIN:
      console.log("loginreducer", action.payload);
      return {
        ...state,
        token: action.payload.token,
      };
    case HANDLE_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducerLogin;
