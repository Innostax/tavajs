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
  }
},
  extraReducers: {
    [asyncActions.getUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = action.payload;
    },
  },
});

export default slice

export const { name, actions, reducer } = slice

