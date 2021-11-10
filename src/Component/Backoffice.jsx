import React from 'react'
import Button from 'react-bootstrap/Button'
import '../static/styles/Backoffice.css'

// localStorage.setItem('user-data', JSON.stringify(
// { username: 'Ben', token: null, role: 'admin' }))

// response from srv:
const application = {
  sucess: true,
  body: [
    { app: 'Clientes', permission: ['admin'] },
    { app: 'Reportes', permission: ['admin'] },
    { app: 'Fichadas', permission: ['admin'] },
    { app: 'Update', permission: ['admin'] },
    { app: 'Tablero', permission: ['admin'] },
    { app: 'Backup', permission: ['admin'] },
    { app: 'Otras aplicaciones', permission: ['admin'] },
    { app: 'Editar perfil', permission: ['user', 'admin'] }],
}

export default function Backoffice() {
  const { role } = JSON.parse(localStorage.getItem('user-data'))
  const appsFiltered = role === 'admin'
    ? application.body
    : application.body.filter((app) => app.permission.includes(role))
  return (
    <div className="grid">
      {appsFiltered.map((app) => (<Button size="lg" key={app.app}>{app.app}</Button>))}
    </div>
  )
}
