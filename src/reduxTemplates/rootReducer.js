import { combineReducers } from "redux";
import * as users from "./Screens/Users";
import * as userContext from "./infrastructure/userContext";

export default combineReducers({
  [users.name]: users.reducer,
  [userContext.name]: userContext.reducer,
});
