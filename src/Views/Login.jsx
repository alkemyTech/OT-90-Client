import React from 'react';
import { Formik } from 'formik';
import {
  Col, Form, Row, Button, FloatingLabel,
} from 'react-bootstrap';

const onSubmit = (values) => {
  // eslint-disable-next-line no-alert
  alert(JSON.stringify(values))
}

const Login = () => {
  return (
    <Formik
      onSubmit={onSubmit}
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
                    type="password"
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
              <Button className="d-block mx-auto" type="submit">Iniciar Sesion</Button>
            </Form>
          </Col>
        </Row>
      )}
    </Formik>
  )
}

export default Login
