import reducers from "./users.reducer";
export const selectReducer = (state) => state[reducers.name];
export const selectAllUsers = (state) => selectReducer(state).users;
export const selectSelectedUserModal = (state) => selectReducer(state).selectedUserModal;
export const selectSelectedUser = (state) => selectReducer(state).selectedUser;