import React from 'react'
import '../static/styles/Backoffice.css'

localStorage.setItem('user-data', JSON.stringify({ username: 'Ben', token: null, role: 'user' }))
const application = {
  sucess: true,
  body: [
    { app: 'Clientes', permission: 'user' },
    { app: 'Reportes', permission: 'user' },
    { app: 'Fichadas', permission: 'user' },
    { app: 'Update', permission: 'admin' },
    { app: 'Tablero', permission: 'user' },
    { app: 'Backup', permission: 'admin' },
    { app: 'Otras aplicaciones', permission: 'user' }],
}

export default function Backoffice() {
  const { role } = JSON.parse(localStorage.getItem('user-data'))
  const appsFiltered = role === 'admin'
    ? application.body
    : application.body.filter((app) => app.permission === role)
  return (
    <div className="backoffice">
      {appsFiltered.map((app) => (<div className="app" key={app.app}>{app.app}</div>))}
    </div>
  )
}
