import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function NavbarView({ user }) {

  // sign out method
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  // token method
  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    // Navbar w BootStrap HTML
    <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">myFlixCinema</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* Hide signup if the token exists  */}
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
            )}
            {isAuth() && (
              <Button variant="link" onClick={() => { onLoggedOut() }}>Logout</Button>
            )}
            {!isAuth() && (
              <Nav.Link href="/">Sign-in</Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link href="/register">Sign-up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
} // close export function Menubar
