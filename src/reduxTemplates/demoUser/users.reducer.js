import { createSlice } from "@reduxjs/toolkit";
import * as asyncActions from "./users.actions";
import { v4 as uuidv4 } from 'uuid';

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
  addNewUser(state, action) {
   const id = uuidv4()
   const user = {...action.payload,id}
   state.users = [...state.users,user]
  },
  deleteUser(state, action) {
    state.users = state.users.filter((each)=>each.id!==action.payload.id)
  },
  editUser(state,action){
    const newUser = state.users.find((each) => each.id === action.payload.id)
			const keys = Object.keys(action.payload)
			keys.forEach((key) => {
				newUser[key] = action.payload[key]
			})
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
  },
});

export default slice

export const { name, actions, reducer } = slice
