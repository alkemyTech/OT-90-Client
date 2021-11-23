import { Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Form } from 'react-bootstrap'
import ButtonComponent from './Button'
import HttpActionEnum from '../enums/HttpActionEnum'
import sendRequest from '../httpClient'

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
  const { testimony } = props
  const [config] = useState(loadComponent(testimony))
  const [action] = useState(
    testimony ? HttpActionEnum.PUT : HttpActionEnum.POST,
  )
  const [isLoading, setIsLoading] = useState(false)
  const [blurredEditor, setblurredEditor] = useState(false)

  const threadSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const onSumbit = async (testimonials) => {
    setIsLoading(true)
    await threadSleep(1000)
    await sendRequest(action, '/testimonials', testimonials)
    setIsLoading(false)

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
        setFieldValue,
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
            <CKEditor
              config={{ placeholder: 'Ingrese el contenido del testimonio' }}
              editor={ClassicEditor}
              onBlur={() => {
                setblurredEditor(true)
              }}
              data={values.content}
              onChange={(event, editor) => {
                setFieldValue('content', editor.getData(), true)
              }}
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
  }).isRequired,
}

export default TestimonyForm
