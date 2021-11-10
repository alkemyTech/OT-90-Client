import React from 'react';
import { Formik } from 'formik';
import {
  Col, Form, Row, Button, FloatingLabel, Container,
} from 'react-bootstrap';

const Contact = () => {
  const validation = ({ email, name, message }) => {
    const errors = {};
    if (!email) {
      errors.email = 'El email es requerido';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      errors.email = 'Email inválido';
    }
    if (!name) {
      errors.name = 'El nombre es requerido';
    }
    if (!message) {
      errors.message = 'El mensaje es requerido';
    }
    return errors;
  }
  const onSubmit = (values) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values))
  }
  return (
    <Container>
      <Formik
        validate={validation}
        onSubmit={onSubmit}
        initialValues={{
          email: '',
          name: '',
          message: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
        }) => (
          <Row className="justify-content-center min-vh-100 align-items-center">
            <Col className="d-flex justify-content-center align-items-center">
              <h1 className="text-center">Envia tu mensaje</h1>
            </Col>
            <Col md="6" className="p-4 p-md-0">
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
                    label="Nombre"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Nombre"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="validationFormik03">
                  <FloatingLabel
                    label="Mensaje"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Mensaje"
                      as="textarea"
                      style={{ height: '150px' }}
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      isInvalid={touched.message && !!errors.message}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.message}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button className="d-block mx-auto" type="submit">Enviar</Button>
              </Form>
            </Col>
          </Row>
        )}
      </Formik>
    </Container>
  )
}

export default Contact
