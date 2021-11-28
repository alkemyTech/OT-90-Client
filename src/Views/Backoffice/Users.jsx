import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Table from '../../Component/Table'
import sendRequest from '../../httpClient'
import HttpActionEnum from '../../enums/HttpActionEnum'

// this line below is just for testing only
// eslint-disable-next-line max-len

export default function Users() {
  const [toggle, setToggle] = useState(false)
  const [users, setUsers] = useState([])

  const cargar = async () => {
    sendRequest(HttpActionEnum.GET, '/users', null)
      .then((res) => setUsers(res.data))
      .catch((error) => error)
  }

  useEffect(() => {
    cargar()
  }, [])

  const headers = ['firstName', 'lastName', 'email', 'image']

  const onDelete = async (id) => {
    try {
      await sendRequest(HttpActionEnum.DELETE, `/users/${id}`)
      Swal.fire('usuario eliminado!')
      setToggle(!toggle)
      cargar()
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal, intenta nuevamente!',
      })
    }
  }
  return (
    <><Table headers={headers} data={users} title="Users" onDelete={onDelete} /></>
  )
}
