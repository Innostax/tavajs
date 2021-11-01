import { combineReducers } from "redux";
import * as users from "./Screens/Users";

export default combineReducers({
  [users.name]: users.reducer,
});
