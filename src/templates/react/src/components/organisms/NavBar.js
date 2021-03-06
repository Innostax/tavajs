import Routes from '../../Routes'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Nav } from 'react-bootstrap'
<% if(isAuth0) {%>import { useAuth0 } from '../../react-spa'<%}%>

<% if(isDark) { %>import { DarkToggle } from '../../themes'<% } %>
const NavBar = ({ brand, links }) => {
<% if(isAuth0) {%>const { logout } = useAuth0()<%}%>
	return (
		<Router>
			<Navbar expand='lg'>
				<Container>
					<Navbar.Brand href='#home'>{brand}</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							{links.map((each) => (
								<Link to={each.href} key={each.label}>
									<Nav.Link href={each.href}>{each.label}</Nav.Link>
								</Link>
							))}
						</Nav>
						<% if(isAuth0) {%>
						<Nav>
							<Nav.Link
								onClick={() => logout({ returnTo: window.location.origin })}
							>
								Logout
							</Nav.Link>
						</Nav>
						<%}%>
					</Navbar.Collapse>
					<% if(isDark) { %><DarkToggle/><% } %>
				</Container>
			</Navbar>
			<Routes />
		</Router>
	)
}

export default NavBar
