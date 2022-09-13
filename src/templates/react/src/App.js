import React<% if(isAuth0){%>,{ useEffect }<%}%> from "react";
<% if(!isOkta){ %> import NavBar from "./components/organisms/NavBar";<%}%>
import "./App.css";
<% if(isAuth0){%>import { useAuth0 } from './react-spa'<%}%>
<% if(isOkta){ %>import { BrowserRouter as Router } from 'react-router-dom';
  import AppWithRouterAccess from './oktaFiles/AppWithRouterAccess';
<%}%>
const App = () => {
  
  <% if(isAuth0){%> const { loginWithRedirect,isUserAuthenticated } = useAuth0()
  useEffect(() => {
 if (isUserAuthenticated === false) {
 loginWithRedirect({ appState: { target: window.location.pathname } })
   }
}, [isUserAuthenticated, loginWithRedirect]) <%}%>
  return (
    <>
    <% if(isOkta){%>
      <Router>
        <AppWithRouterAccess />
      </Router>
    <%}%>
    <% if(!isOkta){ %>
      <% if(isAuth0) {%> {isUserAuthenticated && <%}%><NavBar brand='Made in India'
      links={[
        { href: '/home', label: 'Home' },
        { href: '/users', label: 'Users' },
      ]}/><% if(isAuth0) {%> } <%}%>
    <%}%>
    </>);
};

export default App;
