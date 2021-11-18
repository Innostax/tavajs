import { createSlice } from "@reduxjs/toolkit";
import * as asyncActions from "./users.actions";

const initialState = {
  users: [],
  selectedUserModal: null,
  selectedUser:{},
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
  setSelectedUserModal(state,action){
      state.selectedUserModal = action.payload || initialState.selectedUserModal
  }, 
  setSelectedUser(state,action){
    state.selectedUser = action.payload || initialState.selectedUser
  },
  addNewUser(state, action) {
   const _id = state.users.length 
   const user = {...action.payload,_id} 
   state.users = [...state.users,user]
  },
  deleteUser(state, action) {
    state.users = state.users.filter((each)=>each._id!==action.payload)
  },
  editUser(state,action){
    const newUsers = state.users.filter((each)=>each._id!==action.payload._id)
    state.users=[...newUsers,action.payload]
  }
},
  extraReducers: {
    [asyncActions.getUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = action.payload || initialState.users;
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
