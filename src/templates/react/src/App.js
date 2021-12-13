import React<% if(isAuth0){%>,{ useEffect }<%}%> from "react";
import "./App.css";
<% if(!isOkta){ %>import NavBar from "./components/organisms/NavBar";<%}%><% if(isOkta){ %>import { BrowserRouter as Router } from 'react-router-dom'
import AppWithRouterAccess from './oktaFiles/AppWithRouterAccess'<%}%>
<% if(isAuth0){%>import { useAuth0 } from './react-spa'<%}%>
const App = () => {
  
  <% if(isAuth0){%> const { loginWithRedirect,isUserAuthenticated } = useAuth0()
  useEffect(() => {
 if (isUserAuthenticated === false) {
 loginWithRedirect({ appState: { target: window.location.pathname } })
   }
}, [isUserAuthenticated, loginWithRedirect]) <%}%>
  return (<% if(isOkta){ %><Router>
    <AppWithRouterAccess />
  </Router>
    <%}%>
    <% if(!isOkta){ %>
    <>
            { <% if(isAuth0) {%>isUserAuthenticated&&<%}%>(<NavBar brand='Made in India'
					links={[
						{ href: '/home', label: 'Home' },
						{ href: '/users', label: 'Users' },
					]}/>)}
    </>
    <%}%>
  );
};

export default App;
