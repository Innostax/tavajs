import Routes from '../../Routes'
import {
	AppBar,
	Toolbar,
	CssBaseline,
	Typography
	<%if(isDark) {%>,IconButton <%}%>
	<% if(isAuth0) {%>,Button<%}%>
} from '@mui/material'
import { BrowserRouter as Router, Link } from 'react-router-dom'
<%if(isDark) {%>
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
<%}%>
<% if(isAuth0) {%>import { useAuth0 } from '../../react-spa'<%}%>


const NavBar = ({ brand, links, mode, setMode }) => {

	<% if(isAuth0) {%>const { logout } = useAuth0()<%}%>

	<% if(isDark) {%>
	const toggleTheme = () => {
			setMode(mode === 'light' ? 'dark' : 'light')
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
						<% if(isDark) {%>
						<IconButton sx={{ ml: 1 }} onClick={toggleTheme} color='inherit'>
							{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
						<%}%>
					</div>
				</Toolbar>
			</AppBar>
			<Routes />
		</Router>
	)
}
export default NavBar
