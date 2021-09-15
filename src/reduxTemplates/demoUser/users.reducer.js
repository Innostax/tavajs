import { createSlice } from "@reduxjs/toolkit";
import * as asyncActions from "./users.actions";

const initialState = {
  users: [],
};

// export default createSlice({
//   name: "users",
//   initialState,
//   extraReducers: {
//     [actions.getUsers.fulfilled]: (state, action) => {
//       state.status = "success";
//       state.users = action.payload;
//     },
//   },
// });

const reducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    // synchronous actions
    userAdded(state, action) {
      const { id, name, email, username } = action.payload;
      const existingUser = state.users.find((user) => user.id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
        existingUser.username = username;
      } else {
        state.users.push(action.payload);
      }
    },
    userDeleted(state, action) {
      const { id } = action.payload;
      const existingUser = state.users.find((user) => user.id === id);
      if (existingUser) {
        state.users = state.users.filter((user) => user.id !== id);
      }
    },
  },

  extraReducers: {
    [asyncActions.getUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = action.payload;
    },
  },
});

export default reducer;

export const { name, actions, reducers } = reducer;
