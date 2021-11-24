import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import sendRequest from '../../httpClient'
import Loader from '../../Component/Loader'
import NewsForm from '../../Component/NewsForm'

const NewsEdit = () => {
  const { id } = useParams()
  const [news, setNews] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const getNews = async () => {
      try {
        const { data: { body } } = await sendRequest('GET', `/news/${id}`, null)
        setNews(body)
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error obteniendo la informacion, intenta nuevamente.',
        })
      } finally {
        setIsLoading(false)
      }
    }
    getNews()
  }, [id])
  if (isLoading) return <Loader visible />
  return (
    <Container className="mt-5" style={{ minHeight: '100vh' }}>
      <h1 className="my-4">Editar novedad</h1>
      <NewsForm news={news} />
    </Container>
  )
}

export default NewsEdit
