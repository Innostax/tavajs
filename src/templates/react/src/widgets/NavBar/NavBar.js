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