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
    [actions.addUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = [...state.users, action.payload];
    },
    [actions.deleteUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [actions.updateUsers.fulfilled]: (state, action) => {
      const { id, name, email, username } = action.payload;
      const existingUser = state.users.find((user) => user.id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
        existingUser.username = username;
      }
    },
  },
});
