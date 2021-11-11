import Routes from '../../Routes'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useAuth0 } from '../../react-spa'

const NavBar = ({ brand, links }) => {
	const { logout } = useAuth0()
	return (
		<Router>
			<Navbar bg='light' expand='lg'>
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
						<Nav>
							<Nav.Link
								onClick={() => logout({ returnTo: window.location.origin })}
							>
								Logout
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Routes />
		</Router>
	)
}

export default NavBar
