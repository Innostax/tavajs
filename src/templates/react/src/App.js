import React<% if(isAuth0){%>,{ useEffect }<%}%><% if(isDark){%>,{useState}<%}%> from "react";
import NavBar from "./components/organisms/NavBar";
<% if(isDark){%>import { ThemeProvider, createTheme } from '@mui/material/styles'<%}%>

import "./App.css";
<% if(isAuth0){%>import { useAuth0 } from './react-spa'<%}%>
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
    </>
  );
};

export default App;
