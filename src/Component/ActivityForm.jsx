import { Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Form } from 'react-bootstrap'
import ButtonComponent from './Button'
import HttpActionEnum from '../enums/HttpActionEnum'

const loadComponent = (activity) => {
  if (activity) {
    return {
      textButton: 'Editar',
      name: activity.name,
      content: activity.content,
    }
  }
  return {
    textButton: 'Crear',
    name: '',
    content: '',
  }
}

function ActivityForm(props) {
  const { activity } = props
  const [config] = useState(loadComponent(activity))
  const [action] = useState(
    activity ? HttpActionEnum.PUT : HttpActionEnum.POST,
  )
  const [isLoading, setIsLoading] = useState(false)
  const [blurredEditor, setblurredEditor] = useState(false)

  const threadSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const onSumbit = async (activitys, actionn) => {
    setIsLoading(true)
    await threadSleep(1000)
    setIsLoading(false)
    if (action === HttpActionEnum.POST) {
      // eslint-disable-next-line no-console
      console.log(`Accion: ${actionn}`)
      // eslint-disable-next-line no-console
      console.log(activitys)
    } else if (action === HttpActionEnum.PUT) {
      // eslint-disable-next-line no-console
      console.log(`Accion: ${actionn}`)
      // eslint-disable-next-line no-console
      console.log(activitys)
    }
  }

  const validation = ({ name, content }) => {
    const errors = {}
    if (name.length > 200) {
      errors.name = 'El nombre no puede superar los 200 caracteres'
    } else if (name.length === 0) {
      errors.name = 'El nombre no puede estar vacio'
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
              placeholder="Ingrese el nombre de la actividad"
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

          <Form.Group className="mb-3" controlId="validationFormik02">
            <Form.Label style={{ justifyContent: 'left', display: 'flex' }}>
              Contenido
            </Form.Label>
            <CKEditor
              config={{ placeholder: 'Ingrese el contenido de la actividad' }}
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
                  activity ? {
                    id: activity.id, name: values.name, content: values.content,
                  } : {
                    name: values.name, content: values.content,
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

ActivityForm.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
}

export default ActivityForm
