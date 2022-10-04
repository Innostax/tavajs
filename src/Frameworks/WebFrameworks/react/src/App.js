
import {React<% if(isAuth0){%> ,useEffect <%}%><% if(isThemeProvider && isMaterialUI && !isAuth0){%>,useEffect<%}%><% if(isThemeProvider && isMaterialUI){%> ,useState,<%}%>} from "react";
<% if (isThemeProvider && isMaterialUI) {%>
  import { ThemeProvider, createTheme } from '@mui/material/styles'
  import { THEMES } from './theme.constants'
  <%}%>
<% if (isNetworkInformer){%> import NetworkStatus from './components/NetworkStatus'<%}%>
<% if(isAuth0){%>import { useAuth0 } from './react-spa';<%}%>

import NavBar from "./components/organisms/NavBar";
<% if(isOkta){ %>import { BrowserRouter as Router } from 'react-router-dom';
 
<%}%>
import "./App.css";
<% if (isCognito) {%>
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
  
const { REACT_APP_USER_POOL_ID, REACT_APP_USER_POOL_WEB_CLIENT_ID } = process.env

Amplify.configure({
	Auth: {
		userPoolId: REACT_APP_USER_POOL_ID,
		userPoolWebClientId: REACT_APP_USER_POOL_WEB_CLIENT_ID,
	},
})
<%}%>


const linksOfNav = [
  { href: '/home', label: 'Home' },
  { href: '/users', label: 'Users' },
]
<% if (isThemeProvider && isMaterialUI) {%>const THEME = 'theme'<%}%>
const App = () => {
  <% if(isThemeProvider && isMaterialUI){%>
  const [mode, setMode] = useState('light')
	useEffect(() => {
		const isDarkThemeSelected = localStorage.getItem(THEME) === THEMES.DARK
		if (isDarkThemeSelected) setMode(THEMES.DARK)

		if (isDarkThemeSelected) document.documentElement.classList.add(THEMES.DARK)
		else document.documentElement.classList.remove(THEMES.DARK)
	}, [])
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
    <div id="app">
      <%if(isNetworkInformer){%>
          <NetworkStatus />
      <%}%>
      <%if(!isThemeProvider) {%>
        <%if(isOkta) {%>
          <Router>
            <NavBar brand='Made in India' links={linksOfNav}/>
          </Router>
        <%} else if(isAuth0) {%>
          <>
            {
            isUserAuthenticated && (<NavBar brand='Made in India'
            links={linksOfNav}/>)
            }
          </>

        <%} else {%>
          <NavBar brand='Made in India' links={linksOfNav}/>
        <%}%>
      <%}%>

      

      <%if(isThemeProvider && isMaterialUI) {%>
          <% if(isOkta) {%>
            <Router>
            <ThemeProvider theme={theme}>
              <NavBar brand='Made in India'
              links={linksOfNav} 
              mode={mode}
              setMode={setMode}/>
              </ThemeProvider>
            </Router>
          <%} else if(isAuth0) { %>
            <>
              {
                  isUserAuthenticated && ((<ThemeProvider theme={theme}><NavBar brand='Made in India'
                  links={linksOfNav}
                      mode={mode}
                      setMode={setMode}/>
                      </ThemeProvider>))
              }
            </>
  
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


      <%if(isThemeProvider && (isBootstrap || isTailWind)) {%>
        <% if(isOkta) {%>
          <Router>
          <NavBar brand='Made in India' links={linksOfNav}/>
          </Router>
        <%} else if(isAuth0) { %>
                <>
                {
                isUserAuthenticated && ((<NavBar brand='Made in India'
                links={linksOfNav}/>
                    ))
                  }
                    </>
        <%} else { %>
                    <NavBar
                      brand='Made in India'
                        links={linksOfNav}/>
                  
        <%}%>
    <%}%>
  </div>
  )
};
<% if(isCognito){%>export default withAuthenticator(App)
<%} else { %>export default App;  <%}%>
