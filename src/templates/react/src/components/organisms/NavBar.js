import Routes from '../../Routes'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Nav } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { selectAppMode } from '../../screens/Users/users.selectors'
import { useSelector } from 'react-redux'

const NavBar = ({ brand, links, clickTheme }) => {
	return (
		<Router>
			<Navbar variant={useSelector(selectAppMode)} expand='lg'>
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
					<BootstrapSwitchButton
						checked={false}
						width={100}
						onlabel='Dark'
						offlabel='Light'
						onstyle='secondary'
						onChange={clickTheme}/>
				</Container>
			</Navbar>
			<Routes />
		</Router>
	)
}

export default NavBar
