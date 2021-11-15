import { combineReducers } from "redux";
import * as userContext from "./infrastructure/userContext";
import * as users from "./screens/users";

export default combineReducers({
  [users.name]: users.reducer,
  [userContext.name]: userContext.reducer,
});
