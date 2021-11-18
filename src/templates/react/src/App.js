import React, { useState }<% if(isAuth0){%>,{ useEffect }<%}%> from "react";
import NavBar from "./components/organisms/NavBar";
import "./App.css";
<% if(isAuth0){%>import { useAuth0 } from './react-spa'<%}%>
import styled, { ThemeProvider } from 'styled-components'
import { darkTheme, GlobalStyles, lightTheme } from "./themes";
import { actions } from './screens/Users/users.reducer'
import { useDispatch } from 'react-redux'
const StyledApp = styled.div`
	color: ${(props) => props.theme.fontColor};
`
const { setAppMode } = actions
const App = () => {
  
  <% if(isAuth0){%> const { loginWithRedirect,isUserAuthenticated } = useAuth0()
  useEffect(() => {
 if (isUserAuthenticated === false) {
 loginWithRedirect({ appState: { target: window.location.pathname } })
   }
}, [isUserAuthenticated, loginWithRedirect]) <%}%>
const themeType = ['light', 'dark']
	const [theme, setTheme] = useState(themeType[0])
	const dispatch = useDispatch()
	const themeToggler = () => {
		setTheme(theme === themeType[0] ? themeType[1] : themeType[0])
		dispatch(setAppMode(theme === themeType[0] ? themeType[1] : themeType[0]))
	}

  return (
    <>
    		<ThemeProvider theme={theme === themeType[0] ? lightTheme : darkTheme}>
			<GlobalStyles />
			<StyledApp>
            { <% if(isAuth0) {%>isUserAuthenticated&&<%}%>(<NavBar brand='Made in India'
					links={[
						{ href: '/home', label: 'Home' },
						{ href: '/users', label: 'Users' },
					]}
          clickTheme={themeToggler}
          />)}
          			</StyledApp>
		</ThemeProvider>
    </>
  );
};

export default App;
