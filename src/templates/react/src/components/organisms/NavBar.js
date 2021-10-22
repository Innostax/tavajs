import Routes from '../../Routes'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Nav } from 'react-bootstrap'

const NavBar = ({ brand, links }) => {
	return (
		<Router>
			<Navbar bg='light' expand='lg'>
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
				</Container>
			</Navbar>
			<Routes />
		</Router>
	)
}

export default NavBar
