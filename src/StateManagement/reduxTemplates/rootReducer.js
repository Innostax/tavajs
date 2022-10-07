import { combineReducers } from "redux";
import * as userContext from "./infrastructure/userContext";
import * as users from "./screens/Users";

export default combineReducers({
    [users.name]: users.reducer,
    [userContext.name]: userContext.reducer,
});
