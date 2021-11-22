import { combineReducers } from "redux";
import * as users from "./screens/Users";

export default combineReducers({
  [users.name]: users.reducer,
});
