
import {React<% if(isAuth0){%> ,useEffect <%}%><% if(isDark && isMaterialUI){%> ,useState<%}%>} from "react";
<% if(isDark && isMaterialUI){%>import { ThemeProvider, createTheme } from '@mui/material/styles'<%}%>
<% if(isAuth0){%>import { useAuth0 } from './react-spa';<%}%>

<% if(!isOkta){ %> import NavBar from "./components/organisms/NavBar";<%}%>
<% if(isOkta){ %>import { BrowserRouter as Router } from 'react-router-dom';
  import AppWithRouterAccess from './oktaFiles/AppWithRouterAccess';
<%}%>
import "./App.css";

<%if(!isOkta && !isAuth0){%>
const linksOfNav = [
  { href: '/home', label: 'Home' },
  { href: '/users', label: 'Users' },
]<%}%>

const App = () => {
  <% if(isDark && isMaterialUI){%>
    const [mode, setMode] = useState('light')
    const theme = createTheme({
      palette: {
        mode: mode,
      },
    })
  <%}%>
  
  <% if(isAuth0){%> 
      const { loginWithRedirect,isUserAuthenticated } = useAuth0()
      useEffect(() => {
      if (isUserAuthenticated === false) {
        loginWithRedirect({ appState: { target: window.location.pathname } })
      }
    }, [isUserAuthenticated, loginWithRedirect]) 
  <%}%>

  return (
      <%if(!isDark) {%>
        <%if(isOkta) {%>
          <Router>
            <AppWithRouterAccess />
          </Router>
        <%} else if(isAuth0) {%>
          isUserAuthenticated && (<NavBar brand='Made in India'
			              links={[
			 	              { href: '/home', label: 'Home' },
			 		            { href: '/users', label: 'Users' },
			              ]}/>)
        <%} else {%>
          <NavBar brand='Made in India' links={linksOfNav}/>
        <%}%>
      <%}%>
      <%if(isDark) {%>
          <% if(isOkta) {%>
            <Router>
              <AppWithRouterAccess />
            </Router>
          <%} else if(isAuth0) { %>
                  isUserAuthenticated && ((<ThemeProvider theme={theme}><NavBar brand='Made in India'
				              links={[
					              { href: '/home', label: 'Home' },
				                { href: '/users', label: 'Users' },
				              ]}
                      mode={mode}
                      setMode={setMode}/>
                      </ThemeProvider>))
          <%} else { %>
                   <ThemeProvider theme={theme}>
                      <NavBar
                        brand='Made in India'
                          links={linksOfNav}
                          mode={mode}
                          setMode={setMode}
                      />
                    </ThemeProvider>
          <%}%>
      <%}%>
  )
};

export default App;
