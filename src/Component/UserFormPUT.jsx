import React, { useState, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import sendRequest from '../httpClient'
import httpActionEnum from '../enums/HttpActionEnum'
import Loader from './Loader'
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, updateLogged } from '../app/userSlice'
import {Upload} from './AWS'
import { useHistory } from 'react-router-dom'

export default function UserFormPUT(){
  const user = useSelector(selectUser)
  const [isLoading, setIsLoading] = useState(false)
  const fileInput = useRef()
  const history = useHistory()
  const dispatch = useDispatch()
  const id = user.id

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.Image,
      id: user.id
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const imageAws = await Upload(fileInput.current.files[0], `${values.lastName}.profile`)
        const dataUser = {
          id: id,
          firstName: values.firstName,
          lastName: values.lastName,
          image: imageAws.location !== undefined ?  imageAws.location : null
        }
        setIsLoading(true)
        const respuestaPut = await sendRequest(httpActionEnum.PUT, `/users/${id}`, dataUser)
        /* const users = await sendRequest(httpActionEnum.GET, `/users`, null)
        const userEdited = users.data.filter(user => user.id === dataUser.id) */
        // console.log(userEdited) 
        // console.log(respuestaPut)
        // localStorage.setItem('user-data', JSON.stringify({ token: userEdited.data.body.user.token })) 
        
        dispatch(updateLogged(respuestaPut.data)) 
        Swal.fire({
          icon: 'success',
          title: 'usuario modificado',
          text: 'Gracias',
        })
        //history.push('/backoffice/profile')
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error modificando, intenta nuevamente.'
        })
      } finally {
        setIsLoading(false)
      }}
  })

  return (
    <>
      <Loader visible={isLoading} />
      <h1 className='display-7'>Editar Usuario</h1>
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
          <Form.Label>Image</Form.Label>
          <Form.Control name='image' type='file' onChange={formik.handleChange} ref={fileInput} value={formik.values.image}/>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Button type='submit' variant="primary">Guardar</Button>
        </Form.Group>
      </Form>
    </>)
}
