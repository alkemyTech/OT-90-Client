import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import Loader from '../../Component/Loader';
import { selectUser } from '../../app/userSlice'
import sendRequest from '../../httpClient'
import { useSelector } from 'react-redux'

function UserProfile() {
  const user = useSelector(selectUser)
  const [visible, setVisible] = useState(false)
  const [deleteResult, setDeleteResult] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setVisible(true)
        await sendRequest('delete', `/users/:${user.id}`, user.id)
        setVisible(false)
        setDeleteResult("Usuario eliminado con exito")
    } catch (error) {
      setVisible(false)
      setDeleteResult("El usuario no se ha podido eliminar")
    }
  }
  return (
    <>
      <section class="container">
        <h3> Perfil de Usuario </h3>
        <ul>
        Nombre:<li> { user.name } </li>
        Apellido:<li>  { user.lastName } </li>
        Email:<li> { user.email } </li>
        { user.image? <img src={user.image} alt="foto de usuario" style={{ maxWidth: 250, maxHeight: 250  }}/> 
        : <img src="/images/userImage.png" alt="foto de usuario" style={{ maxWidth: 250, maxHeight: 250  }}/>  }  
        </ul>
      </section> 
      <Link to={`/editarusuario/:${user.id}`}> 
        <Button variant="secondary">Editar perfil</Button>
      </Link>
        <Loader visible={visible} />
        <Button onClick={handleSubmit} variant="danger">Eliminar perfil</Button>
        <p>{deleteResult}</p>       
    </>
  )
}

export default UserProfile
