import { NavDropdown } from 'react-bootstrap/'
import { NavLink } from 'react-router-dom'
import React from 'react'

export default function NavbarComponent() {
  const NavBarItems = [
    {
      view: 'Nosotros',
      root: 'nosotros',
    },
    {
      view: 'Testimonios',
      root: 'testimonials',
    },
    {
      view: 'Novedades',
      root: 'novedades',
    },
    {
      view: 'Contacto',
      root: 'contacto',
    },

  ]
  return (
    <>
      {NavBarItems.map((item, index) => <NavDropdown.Item key={index}><NavLink activeClassName="active" to={`/${item.root}`}>{item.view}</NavLink></NavDropdown.Item>)}
    </>
  )
}
