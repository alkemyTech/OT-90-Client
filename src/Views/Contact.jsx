import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from 'react-bootstrap'
import React, { useState } from 'react'

import { Formik } from 'formik'
import Loader from '../Component/Loader'
import Swal from 'sweetalert2'
import sendRequest from '../httpClient'

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false)
  const validation = ({
    email, name, message, phone,
  }) => {
    const errors = {}
    if (!email) {
      errors.email = 'El email es requerido'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      errors.email = 'Email inválido'
    }
    if (!name) {
      errors.name = 'El nombre es requerido'
    }
    if (!phone) {
      errors.phone = 'El número de teléfono es requerido'
    } else if (
      !/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(phone)
    ) {
      errors.phone = 'Numero de telefono inválido'
    }
    if (!message) {
      errors.message = 'El mensaje es requerido'
    }
    return errors;
  }
  const onSubmit = async (values, { resetForm }) => {
    try {
      setIsLoading(true)
      await sendRequest('POST', '/contacts', values)
      resetForm({})
      Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado',
        text: 'Pronto te contactaremos.',
      })
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrio un error enviando el mensaje, intenta nuevamente.',
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <Loader visible={isLoading} />
      <Container>
        <Formik
          validate={validation}
          onSubmit={onSubmit}
          initialValues={{
            email: '',
            name: '',
            phone: '',
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
                      label="Número de teléfono"
                      className="mb-3"
                    >
                      <Form.Control
                        type="tel"
                        placeholder="Número de teléfono"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        isInvalid={touched.phone && !!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group controlId="validationFormik03">
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
                  <Form.Group controlId="validationFormik04">
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
                  <Button className="d-block w-50 mx-auto" type="submit">Enviar</Button>
                </Form>
              </Col>
            </Row>
          )}
        </Formik>
      </Container>
    </>
  )
}

export default Contact
