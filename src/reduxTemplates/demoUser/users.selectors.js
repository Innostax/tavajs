import reducers from "./users.reducer";
export const selectReducer = (state) => state[reducers.name];
export const selectAllUsers = (state) => selectReducer(state).users;
