import { FETCH_EVENT } from "../actions/getInvitedEvents";
import { HANDLE_LOGOUT } from "../actions/logout";

const initialState = [];

const reducerEvents = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENT:
      return {
        invitedEvents: action.payload,
      };

    default:
      return state;
  }
};

export default reducerEvents;
