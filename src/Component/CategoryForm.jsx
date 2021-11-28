import { Formik } from 'formik'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import ButtonComponent from './Button'
import HttpActionEnum from '../enums/HttpActionEnum'
import sendRequest from '../httpClient'

const loadComponent = (category) => {
  if (category) {
    return {
      textButton: 'Editar',
      name: category.name,
      description: category.description,
    }
  }
  return {
    textButton: 'Crear',
    name: '',
    description: '',
  }
}

function CategoryForm(props) {
  const { change, setChange } = props
  const { category } = props
  const history = useHistory()

  const [config] = useState(loadComponent(category))
  const [action] = useState(
    category ? HttpActionEnum.PUT : HttpActionEnum.POST,
  )

  const [isLoading, setIsLoading] = useState(false)

  const threadSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const onSumbit = async (categories) => {
    try {
      setIsLoading(true)
      await threadSleep(1000)
      if (action === 'post') {
        await sendRequest(action, '/categories', categories)
      } else await sendRequest(action, `/categories/${categories.id}`, categories)

      setIsLoading(false)
      if (setChange && change) setChange(!change)
      Swal.fire('Categoria agregado correctamente')
      if (category !== undefined) {
        return history.push('/backoffice/allCategories')
      }
      // return history.push('/categorias')
      return history.push('/backoffice/allCategories')
    } catch (err) {
      setIsLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal, intenta nuevamente!',
      })
    }
  }

  const validation = ({ name, description }) => {
    const errors = {}
    if (name.length > 200) {
      errors.name = 'El nombre no puede superar los 200 caracteres'
    } else if (name.length === 0) {
      errors.name = 'El nombre no puede estar vacio'
    }
    if (description.length > 255) {
      errors.description = 'El contenido no puede superar los 255 caracteres'
    } else if (description.length === 0) {
      errors.description = 'El contenido no puede estar vacio'
    }
    return errors
  }

  return (
      <Formik
        validate={validation}
        initialValues={{
          name: config.name,
          description: config.description,
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
                placeholder="Ingrese el nombre del categoria"
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
                Descripción
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del categoria"
                name="description"
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
                isValid={touched.name && !errors.name}
                isInvalid={touched.name && errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
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
                  category ? {
                    id: category.id,
                    name: values.name,
                    description: values.description,
                  } : {
                    name: values.name, description: values.description,
                  }, action,
                )
              }
                isLoading={isLoading}
                disabled={!!((errors.name || errors.description))}
              />
            </Form.Group>
          </Form>
        )}
      </Formik>
  )
}

CategoryForm.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  change: PropTypes.bool,
  setChange: PropTypes.bool,
}
CategoryForm.defaultProps = {
  change: true,
  setChange: false,
};

export default CategoryForm
