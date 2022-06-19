import React from 'react';
import useAuth from '../hooks/useAuth.jsx';
import { Button, Container, Navbar } from 'react-bootstrap';

const NavbarLayout = () => {
  const auth = useAuth();

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        { auth.loggedIn ? <Button variant="primary" onClick={auth.logOut}>Выйти</Button> : null }
      </Container>
    </Navbar>
  );
};

export default NavbarLayout;
