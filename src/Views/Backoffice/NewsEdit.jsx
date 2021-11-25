import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useParams, useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import sendRequest from '../../httpClient'
import Loader from '../../Component/Loader'
import NewsForm from '../../Component/NewsForm'

const NewsEdit = () => {
  const { id } = useParams()
  const [news, setNews] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { push } = useHistory()
  useEffect(() => {
    const getNews = async () => {
      try {
        const { data: { body } } = await sendRequest('GET', `/news/${id}`, null)
        const notFounded = Object.keys(body).length === 0
        if (notFounded) {
          return (
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Novedad no encontrada',
              confirmButtonText: 'Volver al listado',
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then(({ isConfirmed }) => {
              if (isConfirmed) push('/backoffice/news')
            })
          )
        }
        return setNews(body)
      } catch (e) {
        return Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error obteniendo la informacion, intenta nuevamente.',
        })
      } finally {
        setIsLoading(false)
      }
    }
    getNews()
  }, [id, push])
  if (isLoading) return <Loader visible />
  return (
    <Container className="mt-5" style={{ minHeight: '100vh' }}>
      <h1 className="my-4">Editar novedad</h1>
      <NewsForm news={news} />
    </Container>
  )
}

export default NewsEdit
