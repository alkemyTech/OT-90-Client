import React from 'react'
import { Container } from 'react-bootstrap'
import NewsForm from '../../Component/NewsForm'

const NewsCreate = () => (
  <Container className="mt-5" style={{ minHeight: '100vh' }}>
    <h1 className="my-4">Crear novedad</h1>
    <NewsForm />
  </Container>
)

export default NewsCreate
