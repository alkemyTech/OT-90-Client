import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Form, Button, FloatingLabel, Container,
} from 'react-bootstrap';
import Swal from 'sweetalert2';
import Loader from './Loader'

const HomeForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const validation = ({
    welcomeText, slideOne, slideOneText, slideTwo, slideTwoText, slideThree, slideThreeText,
  }) => {
    const errors = {};
    if (!welcomeText) {
      errors.welcomeText = 'El mensaje es requerido';
    } else if (welcomeText.trim().length < 22) {
      errors.welcomeText = 'Minimo 22 caracteres'
    }
    if (!slideOne) {
      errors.slideOne = 'La imagen es requerida';
    }
    if (!slideOneText) {
      errors.slideOneText = 'El texto es requerido';
    }
    if (!slideTwo) {
      errors.slideTwo = 'La imagen es requerida';
    }
    if (!slideTwoText) {
      errors.slideTwoText = 'El texto es requerido';
    }
    if (!slideThree) {
      errors.slideThree = 'La imagen es requerida';
    }
    if (!slideThreeText) {
      errors.slideThreeText = 'El texto es requerido';
    }
    return errors;
  }
  const onSubmit = async (values, { resetForm }) => {
    try {
      setIsLoading(true)
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values))
      resetForm({})
      Swal.fire({
        icon: 'success',
        title: 'Cambios Guardados',
      })
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrio un error guardando los cambios, intenta nuevamente.',
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <Loader visible={isLoading} />
      <Container className="px-md-5">
        <h1 className="mb-5">Editar Home</h1>
        <Formik
          validate={validation}
          onSubmit={onSubmit}
          initialValues={{
            welcomeText: '',
            slideOne: '',
            slideOneText: '',
            slideTwo: '',
            slideTwoText: '',
            slideThree: '',
            slideThreeText: '',
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="validationFormik01">
                <FloatingLabel
                  label="Mensaje de Bienvenida"
                  className="mb-4"
                >
                  <Form.Control
                    type="text"
                    placeholder="Mensaje de Bienvenida"
                    as="textarea"
                    style={{ height: '150px' }}
                    name="welcomeText"
                    value={values.welcomeText}
                    onChange={handleChange}
                    isInvalid={touched.welcomeText && !!errors.welcomeText}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.welcomeText}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId="validationFormik02" className="mb-4">
                <Form.Label>Slide 1</Form.Label>
                <Form.Control
                  type="file"
                  className="mb-2"
                  name="slideOne"
                  accept="image/*"
                  value={values.slideOne}
                  onChange={handleChange}
                  isInvalid={touched.slideOne && !!errors.slideOne}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.slideOne}
                </Form.Control.Feedback>
                <FloatingLabel
                  label="Texto Slider 1"
                  className="mb-2"
                >
                  <Form.Control
                    type="text"
                    placeholder="Texto Slider 1"
                    as="textarea"
                    style={{ height: '100px' }}
                    name="slideOneText"
                    value={values.slideOneText}
                    onChange={handleChange}
                    isInvalid={touched.slideOneText && !!errors.slideOneText}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.slideOneText}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId="validationFormik03" className="mb-4">
                <Form.Label>Slide 2</Form.Label>
                <Form.Control
                  type="file"
                  className="mb-2"
                  name="slideTwo"
                  accept="image/*"
                  value={values.slideTwo}
                  onChange={handleChange}
                  isInvalid={touched.slideTwo && !!errors.slideTwo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.slideTwo}
                </Form.Control.Feedback>
                <FloatingLabel
                  label="Texto Slider 2"
                  className="mb-2"
                >
                  <Form.Control
                    type="text"
                    placeholder="Texto Slider 2"
                    as="textarea"
                    style={{ height: '100px' }}
                    name="slideTwoText"
                    value={values.slideTwoText}
                    onChange={handleChange}
                    isInvalid={touched.slideTwoText && !!errors.slideTwoText}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.slideTwoText}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId="validationFormik04" className="mb-4">
                <Form.Label>Slide 3</Form.Label>
                <Form.Control
                  type="file"
                  className="mb-2"
                  name="slideThree"
                  accept="image/*"
                  value={values.slideThree}
                  onChange={handleChange}
                  isInvalid={touched.slideThree && !!errors.slideThree}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.slideThree}
                </Form.Control.Feedback>
                <FloatingLabel
                  label="Texto Slider 3"
                  className="mb-2"
                >
                  <Form.Control
                    type="text"
                    placeholder="Texto Slider 3"
                    as="textarea"
                    style={{ height: '100px' }}
                    name="slideThreeText"
                    value={values.slideThreeText}
                    onChange={handleChange}
                    isInvalid={touched.slideThreeText && !!errors.slideThreeText}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.slideThreeText}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Button className="d-block w-50 mx-auto" type="submit">Guardar Cambios</Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  )
}

export default HomeForm
