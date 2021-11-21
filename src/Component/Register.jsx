/* eslint-disable jsx-a11y/label-has-associated-control */
// import React from 'react'
import React, { useState } from 'react'
import { Formik } from 'formik'
import '../features/register/register.css'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Col, Form, Row, FloatingLabel,
} from 'react-bootstrap'
import Swal from 'sweetalert2'
import sendRequest from '../httpClient'
import httpActionEnum from '../enums/HttpActionEnum'
import { setLogged } from '../app/userSlice'
import Loader from './Loader'

const Register = () => {
  let changed = false
  const [isLoading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  const validate = ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }) => {
    const errors = {}
    changed = true
    if (!firstName) {
      errors.firstName = 'Ingrese su nombre'
    } else if (!/^[a-zA-ZÀ-ÿ\s]{3,40}$/.test(firstName)) {
      errors.firstName = 'El nombre debe contener solo letras, al menos 3.'
    }
    if (!lastName) {
      errors.lastName = 'Ingrese su apellido'
    } else if (!/^[a-zA-ZÀ-ÿ\s]{3,40}$/.test(lastName)) {
      errors.lastName = 'El apellido solo puede tener letras, al menos 3.'
    }
    if (!email) {
      errors.email = 'Ingrese su email'
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)
    ) {
      errors.email = 'Ingrese un correo valido'
    }

    if (!password) {
      errors.password = 'Ingrese su contraseña'
    }
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-|[\]]{6,50}$/.test(password)
    ) {
      errors.password = 'La contraseña debe tener al menos 6 digitos e incluir carácteres alfanuméricos'
    }

    if (!confirmPassword) errors.confirmPassword = 'Por favor, confirme su contraseña'
    if (confirmPassword !== password) errors.confirmPassword = 'Las contraseñas deben coincidir'

    return errors
  }

  const handleOnSubmit = async (values, { resetForm }) => {
    try {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        role: 'Standard',
      }
      const password = { password: values.password }
      setLoading(true)
      const userData = await sendRequest(httpActionEnum.POST, '/users', {
        ...data,
        ...password,
      })
      dispatch(setLogged(userData.data.body))
      localStorage.setItem('user-data', JSON.stringify({ token: userData.data.body.token }))
      history.push('/')
    } catch (e) {
      const text = 'Ocurrio un error, intenta nuevamente.'
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text,
      })
    } finally {
      setLoading(false)
    }
    resetForm()
  }

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validate={validate}
        onSubmit={handleOnSubmit}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
        }) => (
          <Row className="m-0 justify-content-center min-vh-100 align-content-center">
            <Col sm="6" md="4" lg="3" className="p-4 p-md-0">
              <h1 className="text-center mb-4">Registrate</h1>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="validationFormik01">
                  <FloatingLabel label="Nombre" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Nombre"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.firstName && !!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="validationFormik01">
                  <FloatingLabel label="Apellido" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Apellido"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.lastName && !!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="validationFormik01">
                  <FloatingLabel label="Correo" className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Correo"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="validationFormik01">
                  <FloatingLabel label="Contraseña" className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="validationFormik01">
                  <FloatingLabel label="Confirmar Contraseña" className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Confirmar Contraseña"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                {Object.keys(errors).length === 0 && changed === true ? (
                  <button type="submit" className="btn btn-primary">
                    Registrarse
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary" disabled>
                    { isLoading ? <Loader visible={isLoading} width={20} height={20} className="" /> : 'Registrarse' }
                  </button>
                )}
              </Form>
            </Col>
          </Row>
        )}
      </Formik>
    </>
  )
}

export default Register
