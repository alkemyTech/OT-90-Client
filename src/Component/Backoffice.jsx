import '../static/styles/Backoffice.css'

import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../app/userSlice'

// localStorage.setItem('user-data', JSON.stringify(
// { username: 'Ben', token: null, role: 'admin' }))

// response from srv:
const application = {
  sucess: true,
  body: [
    { app: 'Novedades', permission: 'admin', route: '/news' },
    { app: 'Actividades', permission: 'admin', route: '/activities' },
    { app: 'Categorias', permission: 'admin', route: '/categories' },
    { app: 'Contactos', permission: 'admin', route: '/contacts' },
    { app: 'Testimonios', permission: 'admin', route: '/testimonials' },
    { app: 'Usuarios', permission: 'admin', route: '/users' },
    { app: 'EditOrganization', permission: 'admin', route: '/editorganization/1' },
    { app: 'Editar Perfil', permission: 'standard', route: '/profile' }],
}

export default function Backoffice({ path }) {
  const history = useHistory()
  const { role } = useSelector(selectUser)
  const appsFiltered = role.toLowerCase().trim() === 'admin'
    ? application.body
    : application.body.filter((app) => app.permission.includes(role.toLowerCase().trim()))
  return (
    <div className="grid">
      {appsFiltered.map((app) => (<Button size="lg" key={app.app} onClick={() => history.push(`${path}${app.route}`)}>{app.app}</Button>))}
    </div>
  )
}

Backoffice.propTypes = {
  path: PropTypes.string.isRequired,
}
