
import {React<% if(isAuth0){%> ,useEffect <%}%><% if(isDark){%> ,useState<%}%>} from "react";
<% if(isDark){%>import { ThemeProvider, createTheme } from '@mui/material/styles'<%}%>
<% if(isAuth0){%>import { useAuth0 } from './react-spa'<%}%>

<% if(!isOkta){ %> import NavBar from "./components/organisms/NavBar";<%}%>
<% if(isOkta){ %>import { BrowserRouter as Router } from 'react-router-dom';
  import AppWithRouterAccess from './oktaFiles/AppWithRouterAccess';
<%}%>
import "./App.css";

const App = () => {
  <% if(isDark){%>
    const [mode, setMode] = useState('light')
    const theme = createTheme({
      palette: {
        mode: mode,
      },
    })
  <%}%>
  
  <% if(isAuth0){%> const { loginWithRedirect,isUserAuthenticated } = useAuth0()
  useEffect(() => {
    if (isUserAuthenticated === false) {
      loginWithRedirect({ appState: { target: window.location.pathname } })
    }
  }, [isUserAuthenticated, loginWithRedirect]) <%}%>

  return (
    <>
    <% if(isDark === false) {%>
            { <% if(isAuth0) {%>isUserAuthenticated&&<%}%>(<NavBar brand='Made in India'
					links={[
						{ href: '/home', label: 'Home' },
						{ href: '/users', label: 'Users' },
					]}/>)}
          <%}%>
          <% if(isDark) {%>
             <ThemeProvider theme={theme}>
              <NavBar
                brand='Made in India'
                links={[
                  { href: '/home', label: 'Home' },
                  { href: '/users', label: 'Users' },
                ]}
                mode={mode}
                setMode={setMode}
              />
            </ThemeProvider>
            <%}%>
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
