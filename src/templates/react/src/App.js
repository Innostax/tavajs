import React<% if(isAuth0){%>,{ useEffect }<%}%> from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar/NavBar";
<% if(isAuth0){%>import { useAuth0 } from './react-spa'<%}%>
const App = () => {
  
  <% if(isAuth0){%> const { loginWithRedirect,isUserAuthenticated } = useAuth0()
  useEffect(() => {
 if (isUserAuthenticated === false) {
 loginWithRedirect({ appState: { target: window.location.pathname } })
   }
}, [isUserAuthenticated, loginWithRedirect]) <%}%>
  return (
    <>
            { <% if(isAuth0) {%>isUserAuthenticated&&<%}%>(<NavBar/>)}
    </>
  );
};

export default App;
