<% if(!isOkta) {%>
import React from 'react'
import Routes from "../../Routes";
import { BrowserRouter as Router,Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Navbar,Nav} from 'react-bootstrap'
<% if(isAuth0) {%>import { useAuth0 } from "../../react-spa";<%}%>

export default function NavBar() {
  <% if(isAuth0) {%>const { logout } = useAuth0();<%}%>
  return (
    <>
      <Router>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Made in India</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to="/home"><Nav.Link href="/home">Home</Nav.Link></Link>
                <Link to="/users"><Nav.Link href="/users">Users</Nav.Link></Link>
              </Nav>
              <% if(isAuth0) {%><Nav>
                <Nav.Link
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Logout
                </Nav.Link>
              </Nav><%}%>
              
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes />
      </Router>
    </>
  );
}
<%}%>
<% if(isOkta) {%>
  import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Nav } from 'react-bootstrap'
import React, { Component } from 'react'
import { withAuth } from '@okta/okta-react'
export default withAuth(
	class NavBar extends Component {
		state = { authenticated: null }
		logout = async () => {
			this.props.auth.logout('/')
		}
		render() {
			return (
				<Navbar bg='light' expand='lg'>
					<Container>
						<Navbar.Brand href='#home'>Made in India</Navbar.Brand>
						<Navbar.Toggle aria-controls='basic-navbar-nav' />
						<Navbar.Collapse id='basic-navbar-nav'>
							<Nav className='me-auto'>
								<Link to='/'>
									<Nav.Link href='/'>Home</Nav.Link>
								</Link>
								<Link to='/users'>
									<Nav.Link href='/users'>Users</Nav.Link>
								</Link>
							</Nav>
						</Navbar.Collapse>{' '}
						<button className='btn btn-light btn-lg' onClick={this.logout}>
							Logout
						</button>
					</Container>
				</Navbar>
			)
		}
	}
)

  <%}%>