import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import Loader from './Loader'
import AlertComponent from './Alert'
import sendRequest from '../httpClient'

const CategoryForm = (body) => {
  const { name = '', description = '', id } = body

  const [form, setForm] = useState({ name, description })
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)
  const [variant, setVariant] = useState('success')
  const [title, setTitle] = useState('Success!')
  const handleChange = (eventName, eventValue) => {
    setForm((prev) => ({ ...prev, [eventName]: eventValue }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setVisible(true)
      if (name === '' && description === '') {
        await sendRequest('post', '/categories', form)
        setVariant('success')
        setTitle(`${form.name} Creada!`)
        setVisible(false)
        setShow(true)
      } else {
        await sendRequest('put', `/categories/${id}`, form)
        setVisible(false)
        setVariant('success')
        setTitle(`${form.name} updated!`)
        setShow(true)
      }
    } catch (error) {
      setVariant('danger')
      setTitle('No se pudo crear la categoría')
      setShow(true)
      setVisible(false)
    }
  }

  return (
    <>
      <AlertComponent show={show} variant={variant} title={title} action={() => setShow(false)} />
      <Loader visible={visible} />
      <Container className="mt-5">
        <Form>
          <Form.Group className="mb-3" controlId="Nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="name" value={form.name} onChange={(event) => handleChange(event.target.name, event.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} value={form.description} name="description" onChange={(event) => handleChange(event.target.name, event.target.value)} />
          </Form.Group>
        </Form>

        {form.name === '' || form.description === ''
          ? (
            <Button variant="success" onClick={handleSubmit} disabled>
              Save Changes
            </Button>
          )
          : (
            <Button variant="success" onClick={handleSubmit}>
              Save Changes
            </Button>
          )}

      </Container>
    </>
  )
}

export default CategoryForm
