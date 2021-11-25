import React, { useEffect, useReducer, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from '../../Component/Loader';
import Table from '../../Component/Table'
import sendRequest from '../../httpClient'

const NewsContainer = () => {
  const initialState = {
    data: [],
    isLoading: true,
    error: null,
  }

  const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
      case 'GET_DATA':
        return {
          isLoading: true,
          data: [],
          error: null,
        };
      case 'GET_DATA_OK':
        return {
          isLoading: false,
          data: payload.body,
          error: null,
        };
      case 'ERROR':
        return {
          isLoading: false,
          error: payload,
          data: [],
        };
      case 'DELETE_OK':
        return {
          isLoading: false,
          error: null,
          data: action.deleted.data.filter((d) => d.id !== action.deleted.id),
        };
      default:
        return state
    }
  }
  const [{ data, isLoading }, dispatch] = useReducer(reducer, initialState)

  const [toggle, setToggle] = useState(false)

  const deleteNew = async (id) => {
    try {
      const response = await sendRequest('DELETE', `/news/${id}`, null)
      dispatch({ type: 'DELETE_OK', payload: response, deleted: { id, data } })
    } catch (e) {
      dispatch({ type: 'ERROR', payload: e })
    }
  }

  useEffect(() => {
    const getNews = async () => {
      try {
        const { data: news } = await sendRequest('GET', '/news', null)
        dispatch({ type: 'GET_DATA_OK', payload: news })
      } catch (e) {
        dispatch({ type: 'ERROR', payload: e })
        const { isConfirmed } = await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error obteniendo la información, intenta nuevamente.',
          confirmButtonText: 'Reintentar',
          allowOutsideClick: false,
          allowEscapeKey: false,
        })
        if (isConfirmed) {
          dispatch({ type: 'GET_DATA' })
          setToggle(!toggle)
        }
      }
    }
    getNews()
  }, [toggle])

  const headers = ['name', 'image', 'createdAt']

  return isLoading ? <Loader visible /> : (
    <Container style={{ minHeight: '100vh' }}>
      <Button as={Link} size="lg" variant="info" className="mt-4 me-2 position-absolute end-0" to="/backoffice/news/create">Crear Novedad</Button>
      <Table title="Novedades" headers={headers} data={data} onDelete={deleteNew} />
    </Container>
  )
}

export default NewsContainer
