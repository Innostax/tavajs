import Users from "./Users";
<% if(isRedux) {%>import reducers from "./users.reducer";
import * as selectors from "./users.selectors";
import * as actions from "./users.actions";
export const { getUsers } = actions;
export const { name, reducer } = reducers;
export const { selectAllUsers } = selectors;<%}%> 
export default Users;
