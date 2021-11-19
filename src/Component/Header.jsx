import {
  Button, Container, Nav, NavDropdown, Navbar,
} from 'react-bootstrap/'
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NavBarComponent from './NavBar'
import { selectUser, logOut } from '../app/userSlice'

export default function Header() {
  const [logo, setLogo] = useState(null)
  const dispatch = useDispatch()

  const closeSesion = () => {
    dispatch(logOut())
  }
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then((res) => res.json())
      .then((data) => setLogo(data))
      .catch((error) => error)
  }, [])

  const user = useSelector(selectUser)
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          {logo ? <Link to="/"><img src={logo.sprites.front_default} alt={logo.name} /></Link> : <Link to="/">SomosMas</Link>}
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
