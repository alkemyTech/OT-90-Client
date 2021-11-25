import React, { useState } from 'react'

import {Button, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../../Component/Loader';
import { selectUser, logOut } from '../../app/userSlice'
import sendRequest from '../../httpClient'
import { useSelector, useDispatch } from 'react-redux'
import '../../static/styles/UserProfileEdit.css'
import Swal from 'sweetalert2'

function UserProfile() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const { isConfirmed } = await Swal.fire({
          title: 'Atencion',
          html: '¿Esta seguro que desea eliminar su usuario?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
          confirmButtonColor: 'red',
          cancelButtonText: 'Cancelar',
        })
          if (isConfirmed) {
          setVisible(true)
          await sendRequest('delete', `/users/${user.id}`, null)
          setVisible(false)
          dispatch(logOut())
          }            
    } catch (error) {
      setVisible(false)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrio un error eliminando, intenta nuevamente.'      
    })
  } }
  return (
    <>
      <Container className="containerCard">
        <h3> Perfil de Usuario </h3>
        <ul>
        <li>Nombre: { user.firstName } </li>
        <li>Apellido:  { user.lastName } </li>
        <li>Email: { user.email } </li>
        { user.image? <img src={user.image} alt="foto de usuario" style={{ maxWidth: 250, maxHeight: 250  }}/> 
        : <img src="/images/userImage.png" alt="foto de usuario" style={{ maxWidth: 250, maxHeight: 250  }}/>  }  
        </ul>
      <Link to={`/backoffice/profile/edit`}> 
        <Button variant="secondary">Editar perfil</Button>
      </Link>
        <Loader visible={visible} />
        <Button onClick={handleSubmit} variant="danger">Eliminar perfil</Button>
        </Container>    
    </>
  )
}

export default UserProfile
