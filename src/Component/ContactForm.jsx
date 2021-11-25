import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import sendRequest from '../httpClient';

const ContactForm = ({ contact }) => {
  const [isSavingData, setIsSavingData] = useState(false)
  const { push } = useHistory()
  const formik = useFormik({
    initialValues: {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
      id: contact.id,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El Nombre es requerido').max(200, 'Maximo 200 caracteres'),
      email: Yup.string().required('El Email es requerido').email('Correo invalido'),
      phone: Yup.string().matches(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/, 'Formato inválido. Ej 1145671234')
        .required('El Telefono es requerido'),
      message: Yup.string().required('El mensaje es requerido').max(255, 'Maximo 255 caracteres'),
    }),
    onSubmit: async (values) => {
      if (
        !formik.errors.name && !formik.errors.email
        && !formik.errors.phone && !formik.errors.message
      ) {
        try {
          setIsSavingData(true)
          await sendRequest('PUT', `/contacts/${values.id}`, values)
          const { isConfirmed } = await Swal.fire({
            icon: 'success',
            title: 'Cambios guardados',
            allowOutsideClick: false,
            allowEscapeKey: false,
          })
          if (isConfirmed) push('/backoffice/contacts')
        } catch (e) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrio un error actualizando el contacto, intenta nuevamente.',
          })
        } finally {
          setIsSavingData(false)
        }
      }
    },
  })
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Label htmlFor="name">Nombre</Form.Label>
      <Form.Control
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        className="mb-4"
      />
      <Form.Label className="d-block" style={{ color: 'red' }}>
        {formik.errors.name}
      </Form.Label>
      <Form.Label htmlFor="email">Email</Form.Label>
      <Form.Control
        id="email"
        name="email"
        type="mail"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className="mb-4"
      />
      <Form.Label className="d-block" style={{ color: 'red' }}>
        {formik.errors.email}
      </Form.Label>
      <Form.Label htmlFor="phone">Telefono</Form.Label>
      <Form.Control
        id="phone"
        name="phone"
        type="tel"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phone}
        className="mb-4"
      />
      <Form.Label className="d-block" style={{ color: 'red' }}>
        {formik.errors.phone}
      </Form.Label>
      <Form.Label htmlFor="message">Mensaje</Form.Label>
      <Form.Control
        id="message"
        as="textarea"
        style={{ height: '150px' }}
        name="message"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.message}
        className="mb-4"
      />
      <Form.Label className="d-block" style={{ color: 'red' }}>
        {formik.errors.message}
      </Form.Label>
      <Button
        disabled={
          formik.errors.name || formik.errors.email || formik.errors.phone
          || formik.errors.message || isSavingData
        }
        className="d-block w-50 mx-auto"
        type="submit"
      >
        {isSavingData ? 'Guardando...' : 'Editar contacto'}
      </Button>
    </Form>
  )
}
ContactForm.defaultProps = {
  contact: null,
}
ContactForm.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
}
export default ContactForm
