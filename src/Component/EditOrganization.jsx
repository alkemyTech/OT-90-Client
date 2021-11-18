import React, {useRef, useState} from 'react';

import { Formik } from 'formik'
import Loader from '../Component/Loader';
import Swal from 'sweetalert2';
import {Upload} from './AWS'
import httpActionEnum from '../enums/HttpActionEnum'
import sendRequest from '../httpClient'
import { useParams } from 'react-router-dom';

const EditOrganizationContainer = () => {

let changed = false
const validate = ({
  name
}) => {
  const errors = {}
  changed = true
  if (!name) {
    errors.name = 'Ingrese nombre de organizacion'
  } else if (!/^[a-zA-ZÀ-ÿ\s]{3,40}$/.test(name)) {
    errors.name = 'El nombre debe contener solo letras, al menos 3.'
  return errors
}}

const { id } = useParams()
const [isLoading, setIsLoading] = useState(false)

const fileInput = useRef()

const handleOnSubmit = async (values, { resetForm }) => {
  try {
    const imageAws = await Upload(fileInput.current.files[0], `${values.name}.logo`)
    const datOrg = {
      name: values.name,
      image: imageAws.location !== undefined ?  imageAws.location : null
    }
    setIsLoading(true)
    console.log(datOrg, id)
    await sendRequest(httpActionEnum.PUT, `/organizations/1`, datOrg)
    resetForm({})
    Swal.fire({
      icon: 'success',
      title: 'Organizacion modificada',
      text: 'Gracias',
    })
  } catch (e) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrio un error modificando, intenta nuevamente.'
    })
  } finally {
    setIsLoading(false)
  }
}
return (
  <>

    <Loader visible={isLoading} />
    <div className="formPage vh-100 d-flex align-items-center">

      <Formik
        initialValues={{
          name: '',
          image: ''
        }}
        validate={validate}
        onSubmit={handleOnSubmit}>
        {({
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
        }) => (
          <form
            className="formContainer d-flex flex-column py-5 px-5 col-12 col-md-6 mx-auto"
            onSubmit={handleSubmit}
          >
            <h1 className="text-center py-3">Modificar Organizacion</h1>

            <label htmlFor="firstName">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nombre de organizacion"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name && (
              <p className="text-danger">{errors.name}</p>
            )}
            
            <input
              type="file"
              id="image"
              name="image"
              ref={fileInput}
              value={values.image}
              onChange={handleChange}
            />

            {Object.keys(errors).length === 0 && changed === true
              ? (
                <button type="submit" className="btn btn-primary">
                  Modificar
                </button>
              )
              : (
                <button type="submit" className="btn btn-primary" disabled>
                  Modificar
                </button>
              )}
          </form>
        )}
      </Formik>
    </div>
)
</>)
}
export default EditOrganizationContainer