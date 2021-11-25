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
  const [deleteResult, setDeleteResult] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setVisible(true)
        await sendRequest('delete', `/users/${user.id}`, null)
        setVisible(false)
          Swal.fire({
            title: 'Atencion',
            html: '¿Esta seguro que desea eliminar su usuario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: 'red',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              setDeleteResult("Usuario eliminado con exito")
              dispatch(logOut())
            }
          })     
    } catch (error) {
      setVisible(false)
      setDeleteResult("El usuario no se ha podido eliminar")
    }
  }
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
        <p>{deleteResult}</p>    
        </Container>    
    </>
  )
}

export default UserProfile
