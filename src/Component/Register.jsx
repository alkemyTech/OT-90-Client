/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { Formik } from 'formik'
import '../features/register/register.css'

let changed = false
const validate = ({
  name, lastname, mail, password, confirmPassword,
}) => {
  const errors = {}
  changed = true
  if (!name) {
    errors.name = 'Ingrese su nombre'
  } else if (!/^[a-zA-ZÀ-ÿ\s]{3,40}$/.test(name)) {
    errors.name = 'El nombre solo puede tener letras'
  }
  if (!lastname) {
    errors.lastname = 'Ingrese su apellido'
  } else if (!/^[a-zA-ZÀ-ÿ\s]{3,40}$/.test(lastname)) {
    errors.lastname = 'El apellido solo puede tener letras'
  }
  if (!mail) {
    errors.mail = 'Ingrese su email'
  } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(mail)) {
    errors.mail = 'Ingrese un correo valido'
  }

  if (!password) {
    errors.password = 'Ingrese su contraseña'
  }
  if (!/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,50}$/.test(password)) {
    errors.password = 'La contraseña debe tener al menos 6 digitos'
  }

  if (!confirmPassword) errors.confirmPassword = 'Por favor, confirme su contraseña'
  if (confirmPassword !== password) errors.confirmPassword = 'Las contraseñas deben coincidir'

  return errors
}
const handleOnSubmit = (values, { resetForm }) => {
  // resetForm()
  console.log(values)
}

const Register = () => (
  <>
    <div className="formPage vh-100 d-flex align-items-center">
      <Formik
        initialValues={{
          name: '',
          lastname: '',
          mail: '',
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

            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ingrese su nombre"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.name && errors.name && (
              <p className="text-danger">{errors.name}</p>
            )}

            <label htmlFor="lastname">Apellido</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Ingrese su apellido"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.lastname && errors.lastname && (
              <p className="text-danger">{errors.lastname}</p>
            )}

            <label htmlFor="mail">Correo</label>
            <input
              type="email"
              id="mail"
              name="mail"
              placeholder="Ingrese su correo electrónico"
              value={values.mail}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.mail && errors.mail && (
              <p className="text-danger">{errors.mail}</p>
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
            {console.log(changed)}
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

export default Register
