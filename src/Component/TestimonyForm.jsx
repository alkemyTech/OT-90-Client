import { Formik } from 'formik'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'
import React, { useState, useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Form } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image'
import ButtonComponent from './Button'
import HttpActionEnum from '../enums/HttpActionEnum'
import sendRequest from '../httpClient'
import { Upload } from './AWS'

const loadComponent = (testimony) => {
  if (testimony) {
    return {
      textButton: 'Editar',
      name: testimony.name,
      image: testimony.image,
      content: testimony.content,
    }
  }
  return {
    textButton: 'Crear',
    name: '',
    image: '',
    content: '',
  }
}

function TestimonyForm(props) {
  const { change, setChange } = props
  const { testimony } = props
  const [config] = useState(loadComponent(testimony))
  const [action] = useState(
    testimony ? HttpActionEnum.PUT : HttpActionEnum.POST,
  )
  const [isLoading, setIsLoading] = useState(false)
  const [blurredEditor, setblurredEditor] = useState(false)

  const threadSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  const inputRef = useRef()

  const onSumbit = async (testimonials) => {
    try {
      setIsLoading(true)
      const [file] = inputRef.current.files
      const image = await Upload(file, file.name)
      testimonials.image = image.location
      await threadSleep(1000)
      await sendRequest(action, '/testimonials', testimonials)
      setIsLoading(false)
      setChange(!change)
      Swal.fire('Testimonio agregado correctamente')
    } catch (err) {
      setIsLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal, intenta nuevamente!',
      })
    }
  }

  const validation = ({ name, image, content }) => {
    const errors = {}
    if (name.length > 200) {
      errors.name = 'El nombre no puede superar los 200 caracteres'
    } else if (name.length === 0) {
      errors.name = 'El nombre no puede estar vacio'
    }
    if (image.length === 0) {
      errors.image = 'Debe cargar una imagen'
    }
    if (content.length > 255) {
      errors.content = 'El contenido no puede superar los 255 caracteres'
    } else if (content.length === 0) {
      errors.content = 'El contenido no puede estar vacio'
    }
    return errors
  }

  return (
    <Formik
      validate={validation}
      initialValues={{
        name: config.name,
        image: config.name,
        content: config.content,
      }}
    >
      {({
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
      }) => (
        <Form style={{ width: '100%' }} noValidate>
          <Form.Group className="mb-3" controlId="validationFormik01">
            <Form.Label style={{ justifyContent: 'left', display: 'flex' }}>
              Nombre
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del testimonio"
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              isValid={touched.name && !errors.name}
              isInvalid={touched.name && errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationFormik01">
            <Form.Label style={{ justifyContent: 'left', display: 'flex' }}>
              Imagen
            </Form.Label>
            <Form.Control
              type="file"
              placeholder="Ingrese imagen del testimonio"
              name="image"
              ref={inputRef}
              value={values.image}
              onBlur={handleBlur}
              onChange={handleChange}
              isValid={touched.image && !errors.image}
              isInvalid={touched.image && errors.image}
            />
            <Form.Control.Feedback type="invalid">
              {errors.image}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationFormik02">
            <Form.Label style={{ justifyContent: 'left', display: 'flex' }}>
              Contenido
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del testimonio"
              name="content"
              value={values.content}
              onBlur={handleBlur}
              onChange={handleChange}
              isValid={touched.name && !errors.name}
              isInvalid={touched.name && errors.name}
            />

            <Form.Label visuallyHidden={!blurredEditor} style={{ color: 'red' }}>
              {errors.content}
            </Form.Label>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            style={{ justifyContent: 'left', display: 'flex' }}
          >
            <ButtonComponent
              variant="primary"
              title={config.textButton}
              onClick={
                async () => onSumbit(
                  testimony ? {
                    id: testimony.id, name: values.name, image: values.image, content: values.content,
                  } : {
                    name: values.name, image: values.image, content: values.content,
                  }, action,
                )
              }
              isLoading={isLoading}
              disabled={errors.name || errors.content}
            />
          </Form.Group>
        </Form>
      )}
    </Formik>
  )
}

TestimonyForm.propTypes = {
  testimony: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    content: PropTypes.string,
    change: PropTypes.bool,
    setChange: PropTypes.bool,
  }).isRequired,
}

export default TestimonyForm
