import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./users.actions";

const initialState = {
  users: [],
};

export default createSlice({
  name: "users",
  initialState,
  extraReducers: {
    [actions.getUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = action.payload;
    },
  },
});
