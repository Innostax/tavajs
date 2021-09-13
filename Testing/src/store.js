import { configureStore } from "@reduxjs/toolkit";
import * as users from "./Screens/Users";

export const store = configureStore({
  reducer: { users: users.reducer },
});
