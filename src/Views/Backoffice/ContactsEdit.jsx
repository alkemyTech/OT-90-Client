import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useParams, useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import sendRequest from '../../httpClient'
import Loader from '../../Component/Loader'
import ContactForm from '../../Component/ContactForm'

const ContactsEdit = () => {
  const { id } = useParams()
  const { push } = useHistory()
  const [contact, setContact] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const getContact = async () => {
      try {
        const { data: { body } } = await sendRequest('GET', `/contacts/${id}`, null)
        setContact(body)
      } catch (e) {
        let text = 'Ocurrio un error obteniendo la informacion, intenta nuevamente.'
        if (e === 'Request failed with status code 404') text = 'Contacto no Encontrado'
        const { isConfirmed } = await Swal.fire({
          icon: 'error',
          title: 'Error',
          text,
          confirmButtonText: 'Volver al listado',
          allowOutsideClick: false,
          allowEscapeKey: false,
        })
        if (isConfirmed) push('/backoffice/contacts')
      } finally {
        setIsLoading(false)
      }
    }
    getContact()
  }, [id, push])
  if (isLoading) return <Loader visible />
  return (
    <Container className="mt-5" style={{ minHeight: '100vh' }}>
      <h1 className="my-4">Editar contacto</h1>
      <ContactForm contact={contact} />
    </Container>
  )
}
export default ContactsEdit
