import promoReducer from "./promo";
import userReducer from "./user";
import { combineReducers } from "redux";

const reducers = combineReducers({
  promoReducer,
  userReducer
});

export default reducers;
