import Routes from '../../Routes'
import {
	AppBar,
	Toolbar,
	CssBaseline,
	Typography,
	IconButton,
} from '@mui/material'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

const NavBar = ({ brand, links, mode, setMode }) => {
	const toggleTheme = () => {
		setMode(mode === 'light' ? 'dark' : 'light')
	}
	return (
		<Router>
			<AppBar position="static">
				<CssBaseline />
				<Toolbar>
					<Typography variant='h4' sx={{ flexGrow: '1', cursor: 'pointer' }}>
						{brand}
					</Typography>
					<div sx={{ marginLeft: 2, display: 'flex' }}>
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
						<IconButton sx={{ ml: 1 }} onClick={toggleTheme} color='inherit'>
							{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<Routes />
		</Router>
	)
}
export default NavBar
