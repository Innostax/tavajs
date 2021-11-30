import Routes from '../../Routes'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Nav } from 'react-bootstrap'
<% if(isDark) { %>import { DarkToggle } from '../../themes'<% } %>
const NavBar = ({ brand, links }) => {
	return (
		<Router>
			<Navbar expand='lg'>
				<Container>
					<Navbar.Brand href='#home'>{brand}</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						{links.map((each) => (
							<Link to={each.href} key={each.label}>
								<Nav.Link href={each.href}>{each.label}</Nav.Link>
							</Link>
						))}
					</Navbar.Collapse>
					<% if(isDark) { %><DarkToggle/><% } %>
				</Container>
			</Navbar>
			<Routes />
		</Router>
	)
}

export default NavBar
