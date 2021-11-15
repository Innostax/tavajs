import { combineReducers } from "redux";
import * as users from "./screens/users";

export default combineReducers({
  [users.name]: users.reducer,
});
