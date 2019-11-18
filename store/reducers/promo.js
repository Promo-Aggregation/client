// CONSTANTS
import { DISPLAY_ALL_PROMOS, STATUS_LIMIT } from "../constants";

const initialState = {
  promos: [],
  status: 0,
  interval: 0
};

export default promoReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_ALL_PROMOS:
      return { ...state, promos: action.promos };
    case STATUS_LIMIT:
      return { ...state, status: action.status, interval: action.interval };
    default:
      return state;
  }
};
