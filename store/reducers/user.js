// CONSTANTS
import { DISPLAY_USER, DISPLAY_SUBSCRIPTIONS } from "../constants";

const initialState = {
  token: "",
  subscriptions: []
};

export default userReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_USER:
      return {
        ...state,
        token: action.user.device_token,
        subscriptions: action.user.subscription
      };
    case DISPLAY_SUBSCRIPTIONS:
      return { ...state, subscriptions: action.subscriptions };
    default:
      return state;
  }
};
