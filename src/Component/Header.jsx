import React from 'react'
import {
  Button, Container, Nav, NavDropdown, Navbar,
} from 'react-bootstrap/'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, logOut } from '../app/userSlice'
import NavBarComponent from './NavBar'
import '../static/styles/header.css'
import logo from '../static/assets/somosMasLogo.png'

export default function Header() {
  const dispatch = useDispatch()

  const closeSesion = () => {
    dispatch(logOut())
  }

  const user = useSelector(selectUser)
  return (
    <>
      <Navbar className="header" bg="light" expand="lg">
        <Container>
          <Link to="/"><img src={logo} alt={logo.name} /></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavBarComponent />
              </NavDropdown>
            </Nav>
            {user.isAuthenticated ? <Button variant="outline-warning" onClick={closeSesion}> Cerrar Sesion </Button>
              : (
                <>
                  {' '}
                  <Button variant="outline-warning"><Link to="/login">Login</Link></Button>
                  <Button variant="outline-warning"><Link to="/register">Registro</Link></Button>
                </>
              )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
