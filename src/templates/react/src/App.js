
import {React<% if(isAuth0){%> ,useEffect <%}%><% if(isThemeProvider && isMaterialUI){%> ,useState<%}%>} from "react";
<% if(isThemeProvider && isMaterialUI){%>import { ThemeProvider, createTheme } from '@mui/material/styles'<%}%>
<% if(isAuth0){%>import { useAuth0 } from './react-spa';<%}%>

import NavBar from "./components/organisms/NavBar";
<% if(isOkta){ %>import { BrowserRouter as Router } from 'react-router-dom';
 
<%}%>
import "./App.css";


const linksOfNav = [
  { href: '/home', label: 'Home' },
  { href: '/users', label: 'Users' },
]

const App = () => {
  <% if(isThemeProvider && isMaterialUI){%>
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


      <%if(isThemeProvider && !isMaterialUI) {%>
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
  )
};

export default App;
