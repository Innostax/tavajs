import Routes from '../../Routes'
import {
	AppBar,
	Toolbar,
	CssBaseline,
	Typography
	<%if(isThemeProvider) {%>,IconButton <%}%>
	<% if(isAuth0) {%>,Button<%}%>
} from '@mui/material'
import { BrowserRouter as Router, Link } from 'react-router-dom'
<%if(isThemeProvider) {%>
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { THEMES } from '../../theme.constants'
<%}%>
<% if(isOkta) {%>import AppWithRouterAccess from '../../oktaFiles/AppWithRouterAccess'<%}%>
<% if (isAuth0) {%>import { useAuth0 } from '../../react-spa'<%}%>
<% if (isCognito) {%>
import Button from '../atoms/Button'
import { withAuthenticator } from '@aws-amplify/ui-react'
<%}%>

<%if(isThemeProvider) {%>const THEME = 'theme'<%}%>
const NavBar = ({ brand, links, mode, setMode<% if(isCognito){%>,signOut<%}%>  }) => {

	<% if(isAuth0) {%>const { logout } = useAuth0()<%}%>

	<% if(isThemeProvider) {%>
	const toggleTheme = () => {
		if (mode === 'light') document.documentElement.classList.add(THEMES.DARK)
		else document.documentElement.classList.remove(THEMES.DARK)

		const selectedTheme = mode === 'light' ? THEMES.DARK : THEMES.LIGHT
		localStorage.setItem(THEME, selectedTheme)
		setMode(selectedTheme)
		}
		<%}%>
	return (
		<Router>
			<AppBar position="static">
				<CssBaseline />
				<Toolbar>
					<Typography variant='h4' sx={{ flexGrow: '1', cursor: 'pointer' }}>
						{brand}
					</Typography>
					<div>
						{links.map((each) => (
							<Link
								to={each.href}
								key={each.label}
								style={{
									color: 'white',
									fontSize: '20px',
									'&:hover': {
										color: 'yellow',
										borderBottom: '1px solid white',
									},
									textDecoration: 'none',
									marginLeft: '20px',
								}}
							>
								{each.label}
							</Link>
						))}
						<% if(isAuth0) {%>
							<Button
								color="primary"
								onClick={() => logout({ returnTo: window.location.origin })}
								sx={{ml:'1rem',mr : '1rem',color: 'white' }}
							>
								Logout
							</Button>
						<%}%>
						<% if(isThemeProvider) {%>
						<IconButton sx={{ ml: 1 }} onClick={toggleTheme} color='inherit'>
							{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
						<%}%>
					</div>
					<% if(isOkta) {%>
					<AppWithRouterAccess />
					<%}%>
					<% if(isCognito){%><Button onClick={signOut} name='SignOut' variant='white' /><%}%>
				</Toolbar>
			</AppBar>
			<Routes />
		</Router>
	)
}
<% if(isCognito){%>export default withAuthenticator(NavBar)
<%} else { %>export default NavBar <%}%>
