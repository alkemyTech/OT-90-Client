import React from 'react'
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik'

export default function UserFormPUT(){
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      roleId: '',
    }, onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    }
  })
  return (
    <>
      <h1 className='display-4'>USER PUT:</h1>
      <Form initialValues={{firstName:'', lastName: '', roleId: ''}} className='m-3'>
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
          <Form.Control name='roleId' type='number' min='0' max='1' onChange={formik.handleChange} value={formik.values.roleId} required/>
          <Form.Text className="text-muted">0 = 'user', 1 = 'admin'</Form.Text>
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
