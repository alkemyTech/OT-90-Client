import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'

function UserProfile() {
    const user = useSelector(selectUser)
  return (
    <>
      { user.isAuthenticated && <section class="container">
        <h3> Perfil de Usuario </h3>
        <ul>
        <li> { user.user.name } </li>
        <li> { user.user.lastName } </li>
        <li> { user.user.email } </li>
        </ul>
      </section> }

      <Link to="/editarusuario/:id">
        <Button variant="secondary">Editar perfil</Button>
      </Link>
      <Link to="/eliminarusuario/:id">
        <Button variant="danger">Eliminar perfil</Button>
      </Link>
      
        
    </>
  )
}

export default UserProfile
