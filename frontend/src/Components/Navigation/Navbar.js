import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className={'fixed-top'}>
      <Navbar.Brand className={'ms-4'} as={Link} to={'/'}>Lama Logger</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Link eventKey={'/'} to="/" as={Link}>{'Projects'}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
