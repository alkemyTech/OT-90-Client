import React, { useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import { Form, Button } from 'react-bootstrap'
import sendRequest from '../httpClient'
import Loader from './Loader'
import { Upload } from './AWS'
import httpActionEnum from '../enums/HttpActionEnum'

export default function UserForm(users) {
  const fileInput = useRef()
  const history = useHistory()
  const { id } = useParams()
  const { user } = users

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
    onSubmit: async (values) => {
      try {
        const imageAws = await Upload(fileInput.current.files[0], `${values.lastName}.profile`)
        const dataUser = {
          id,
          firstName: values.firstName,
          lastName: values.lastName,
          image: imageAws.location !== undefined ? imageAws.location : user.image,
        }
        await sendRequest(httpActionEnum.PUT, `/users/${id}`, dataUser)
        Swal.fire({
          icon: 'success',
          title: 'usuario modificado',
          text: 'Gracias',
        })
        history.push('/backoffice/users')
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error modificando, intenta nuevamente.',
        })
      }
    },
  })

  return (
    <>
      <Loader />
      <h1 className="display-7">Editar Usuario</h1>
      <Form onSubmit={formik.handleSubmit} className="m-3">
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control name="firstName" type="text" onChange={formik.handleChange} value={formik.values.firstName} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control name="lastName" type="text" onChange={formik.handleChange} value={formik.values.lastName} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control name="image" type="file" onChange={formik.handleChange} ref={fileInput} value={formik.values.image} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Button type="submit" variant="primary">Guardar</Button>
        </Form.Group>
      </Form>
    </>
  )
}
