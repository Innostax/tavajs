import Routes from '../../Routes'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Nav } from 'react-bootstrap'
<% if(isAuth0) {%>import { useAuth0 } from '../../react-spa'<%}%>
<% if(isOkta) {%>import AppWithRouterAccess from '../../oktaFiles/AppWithRouterAccess'<%}%>
<% if (isThemeProvider) { %>import { ThemeToggler } from '../../theme'<% } %>
<% if (isCognito) {%>
	import Button from '../atoms/Button'
	import { withAuthenticator } from '@aws-amplify/ui-react'
<%}%>
const NavBar = ({ brand, links<% if(isCognito){%>,signOut<%}%> }) => {

<% if(isAuth0) {%>const { logout } = useAuth0()<%}%>
	return (
		<Router>
			<Navbar expand='lg'>
				<Container>
					<Navbar.Brand href='#home'>{brand}</Navbar.Brand>
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
					<% if(isThemeProvider) { %><ThemeToggler/><% } %>
					<% if(isOkta) { %><AppWithRouterAccess /> <% } %>
					<% if(isCognito){%><Button onClick={signOut} name='SignOut' /><%}%>
					<Navbar.Toggle className='collapse-btn' aria-controls='basic-navbar-nav' />
				</Container>
			</Navbar>
			<Routes />
		</Router>
	)
}

<% if(isCognito){%>export default withAuthenticator(NavBar)
<%} else { %>export default NavBar <%}%>
