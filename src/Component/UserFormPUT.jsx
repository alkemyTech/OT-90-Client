import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import sendRequest from '../httpClient'
import Loader from './Loader'
import Swal from 'sweetalert2'

export default function UserFormPUT(){
  const [isLoading, setIsLoading] = useState(false)
  //fetch de user por id
  const [userData, setUserData] = useState({firstName: '', lastName: '', role: ''})
  useEffect(() => {
    setIsLoading(true)
    sendRequest('GET', '/users', null)
    .then((data) => {setUserData(data)})
    .catch((error) => error)
    .finally(() => setIsLoading(false))
  }, [])

  const formik = useFormik({
    initialValues: userData,
    onSubmit: (values) => {
      setIsLoading(true)
      sendRequest('PUT', '/users', values)
      .then(() => {Swal.fire({
          title: 'Successfully updated',
          html: 'Successfully updated',
          icon: 'success',
        })})
      .catch(error => error)
      .finally(() => setIsLoading(false))
    }
  })

  return (
    <>
      <Loader visible={isLoading} />
      <h1 className='display-4'>USER PUT:</h1>
      <Form onSubmit={formik.handleSubmit} className='m-3'>
        <Form.Group className='mb-3'>
          <Form.Label>First Name</Form.Label>
          <Form.Control name='firstName' type='text' onChange={formik.handleChange} value={formik.values.firstName} required/>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control name='lastName' type='text' onChange={formik.handleChange} value={formik.values.lastName} required/>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Role</Form.Label>
          <Form.Control name='role' type='text'onChange={formik.handleChange} value={formik.values.role} required/>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Image</Form.Label>
          <Form.Control name='image' type='file' onChange={formik.handleChange} value={formik.values.image}/>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Button type='submit' variant="primary">Guardar</Button>
        </Form.Group>
      </Form>
    </>)
}
