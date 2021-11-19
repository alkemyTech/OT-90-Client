import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Loader from '../Component/Loader';
import sendRequest from '../httpClient'
import NewsList from '../Component/NewsList';

const News = ({ news }) => (
  <Container>
    <h1 className="p-3">{news.length ? 'Novedades' : 'Sin Novedades' }</h1>
    <NewsList news={news} />
  </Container>
)

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
          data: payload,
          error: null,
        };
      case 'ERROR':
        return {
          isLoading: false,
          error: payload,
          data: [],
        };
      default:
        return state
    }
  }
  const [{ data, isLoading }, dispatch] = useReducer(reducer, initialState)

  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const getNews = async () => {
      try {
        const { data: { body } } = await sendRequest('GET', '/news', null)
        dispatch({ type: 'GET_DATA_OK', payload: body })
      } catch (e) {
        dispatch({ type: 'ERROR', payload: e })
        const { isConfirmed } = await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error obteniendo las novedades, intenta nuevamente.',
          confirmButtonText: 'Reintentar',
        })
        if (isConfirmed) {
          dispatch({ type: 'GET_DATA' })
          setToggle(!toggle)
        }
      }
    }
    getNews()
  }, [toggle])
  return isLoading ? <Loader visible /> : <News news={data} />
}

News.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default NewsContainer
