import { NavDropdown } from 'react-bootstrap/'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../app/userSlice'

export default function NavbarComponent() {
  const { isAuthenticated } = useSelector(selectUser)
  let NavBarItems = []
  if (isAuthenticated !== true) {
    NavBarItems = [
      {
        view: 'Nosotros',
        root: 'nosotros',
      },
      {
        view: 'Testimonios',
        root: 'testimonios',
      },
      {
        view: 'Actividades',
        root: 'actividades',
      },
      {
        view: 'Novedades',
        root: 'novedades',
      },
      {
        view: 'Miembros',
        root: 'miembros',
      },
      {
        view: 'Contacto',
        root: 'contacto',
      },
    ]
  } else {
    NavBarItems = [
      {
        view: 'Nosotros',
        root: 'nosotros',
      },
      {
        view: 'Testimonios',
        root: 'testimonios',
      },
      {
        view: 'Actividades',
        root: 'actividades',
      },
      {
        view: 'Novedades',
        root: 'novedades',
      },
      {
        view: 'Miembros',
        root: 'miembros',
      },
      {
        view: 'Contacto',
        root: 'contacto',
      },
      {
        view: 'Backoffice',
        root: 'Backoffice',
      },
    ]
  }
  return (
    <>
      {NavBarItems.map((item, index) => <NavDropdown.Item key={index}><NavLink activeClassName="active" to={`/${item.root}`}>{item.view}</NavLink></NavDropdown.Item>)}
    </>
  )
}
