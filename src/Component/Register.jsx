/* eslint-disable jsx-a11y/label-has-associated-control */
// import React from 'react'
import React, { useState } from 'react';
import { Formik } from 'formik'
import '../features/register/register.css'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import sendRequest from '../httpClient'
import httpActionEnum from '../enums/HttpActionEnum'
import { setLogged } from '../app/userSlice'
import AlertComponent from './Alert';

const Register = () => {
  let changed = false
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory();

  const validate = ({
    firstName, lastName, email, password, confirmPassword,
  }) => {
    const errors = {}
    changed = true
    if (!firstName) {
      errors.firstName = 'Ingrese su nombre'
    } else if (!/^[a-zA-ZÀ-ÿ\s]{3,40}$/.test(firstName)) {
      errors.firstName = 'El nombre debe contener solo letras, al menos 3.'
    }
    if (!lastName) {
      errors.lastName = 'Ingrese su apellido'
    } else if (!/^[a-zA-ZÀ-ÿ\s]{3,40}$/.test(lastName)) {
      errors.lastName = 'El apellido solo puede tener letras, al menos 3.'
    }
    if (!email) {
      errors.email = 'Ingrese su email'
    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
      errors.email = 'Ingrese un correo valido'
    }

    if (!password) {
      errors.password = 'Ingrese su contraseña'
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-|[\]]{6,50}$/.test(password)) {
      errors.password = 'La contraseña debe tener al menos 6 digitos'
    }

    if (!confirmPassword) errors.confirmPassword = 'Por favor, confirme su contraseña'
    if (confirmPassword !== password) errors.confirmPassword = 'Las contraseñas deben coincidir'

    return errors
  }

  const handleOnSubmit = async (values, { resetForm }) => {
    try {
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        role: 'standard',
      }
      const password = { password: values.password }
      const { data: { body: { token } } } = await sendRequest(httpActionEnum.POST, '/users', { ...userData, ...password })
      localStorage.setItem('user-data', JSON.stringify({ ...userData, token }))
      dispatch(setLogged(userData))
      history.push('/')
    } catch (e) {
      setShow(true)
    }
    resetForm()
  }

  return (
    <>
      <AlertComponent show={show} title="Hubo un error" action={() => setShow(false)} variant="warning" />
      <div className="formPage vh-100 d-flex align-items-center">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validate={validate}
          onSubmit={handleOnSubmit}
        >
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
              <h1 className="text-center py-3">Registrate</h1>

              <label htmlFor="firstName">Nombre</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Ingrese su nombre"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {touched.firstName && errors.firstName && (
              <p className="text-danger">{errors.firstName}</p>
              )}

              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Ingrese su apellido"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {touched.lastName && errors.lastName && (
              <p className="text-danger">{errors.lastName}</p>
              )}

              <label htmlFor="email">Correo</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ingrese su correo electrónico"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
              <p className="text-danger">{errors.email}</p>
              )}

              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Al menos 6 caracteres, debe incluir un número"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {touched.password && errors.password && (
              <p className="text-danger">{errors.password}</p>
              )}

              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirme su contraseña"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-danger">{errors.confirmPassword}</p>
              )}

              {Object.keys(errors).length === 0 && changed === true
                ? (
                  <button type="submit" className="btn btn-primary">
                    Registrarse
                  </button>
                )
                : (
                  <button type="submit" className="btn btn-primary" disabled>
                    Registrarse
                  </button>
                )}
            </form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default Register
