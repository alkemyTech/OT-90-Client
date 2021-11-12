import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Col, Form, Row, Button, FloatingLabel,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setLogged } from '../app/userSlice'
import sendRequest from '../httpClient'
import HttpActionEnum from '../enums/HttpActionEnum'
import AlertComponent from '../Component/Alert'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [showPassword, setShowpassword] = useState(false)
  const [show, setShow] = useState(false)

  const validation = ({ email, password }) => {
    const errors = {};
    if (!email) {
      errors.email = 'El email es requerido';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      errors.email = 'Email inválido';
    }
    if (!password) {
      errors.password = 'La contraseña es requerida';
    } else if (password.trim().length < 6) {
      errors.password = 'Al menos 6 caracteres'
    }
    return errors;
  }

  const onSubmit = async (values) => {
    // eslint-disable-next-line no-alert
    try {
      const userData = await sendRequest(HttpActionEnum.POST, '/users/auth/login', values)

      dispatch(setLogged(userData.data.body.user))
      history.push('/backoffice')
      return 'ok'
    } catch (e) {
      setShow(true)
      return 'error'
    }
  }

  return (
    <>
      <AlertComponent show={show} title="Hubo un error" action={() => setShow(false)} variant="warning" />
      <Formik
        validate={validation}
        initialValues={{
          email: '',
          password: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
        }) => (

          <Row className="justify-content-center min-vh-100 align-content-center">
            <Col sm="6" md="4" lg="3" className="p-4 p-md-0">
              <h1 className="text-center mb-4">Inicia Sesion</h1>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="validationFormik01">
                  <FloatingLabel
                    label="Dirección de correo"
                    className="mb-3"
                  >
                    <Form.Control
                      type="mail"
                      placeholder="Dirección de correo"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="validationFormik02">
                  <FloatingLabel
                    label="Contraseña"
                    className="mb-1"
                  >
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Contraseña"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Check
                  name="showPassword"
                  className="mb-3"
                  label="Mostrar contraseña"
                  onChange={() => setShowpassword(!showPassword)}
                />
                <Button className="d-block mx-auto" type="submit" onClick={() => onSubmit(values, history, dispatch)}>Iniciar Sesion</Button>
              </Form>
            </Col>
          </Row>
        )}
      </Formik>
    </>
  )
}

export default Login
