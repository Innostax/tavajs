import { createSlice } from "@reduxjs/toolkit";
import * as asyncActions from "./users.actions";

const initialState = {
  users: [],
  selectedUserModal: null,
  selectedUser:{}
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: { setSelectedUserModal(state,action){
      state.selectedUserModal = action.payload || initialState.selectedUserModal
  }, 
  setSelectedUser(state,action){
    state.selectedUser = action.payload || initialState.selectedUser
  },
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
    [asyncActions.addUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = [...state.users, action.payload];
    },
    [asyncActions.deleteUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = action.payload
    },
    [asyncActions.updateUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = action.payload
    },
  },
});

export default slice

export const { name, actions, reducer } = slice
