import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Loader from '../Component/Loader';
import Slider from '../Component/Slider';
import sendRequest from '../httpClient'
import NewsList from '../Component/NewsList';
import '../static/styles/Home.css'

const Home = ({ news, welcomeTxt }) => (
  <Container className="home_container">
    <Slider />
    <h1 className="my-5 text-center">{welcomeTxt}</h1>
    <h2>Ultimas Novedades</h2>
    <NewsList news={news} />
  </Container>
)

const HomeContainer = () => {
  const initialState = {
    data: {},
    isLoading: true,
    error: null,
  }

  const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
      case 'GET_DATA':
        return {
          isLoading: true,
          data: {},
          error: null,
        };
      case 'GET_DATA_OK':
        return {
          isLoading: false,
          news: payload.news,
          welcomeTxt: payload.welcomeTxt.welcomeText,
          error: null,
        };
      case 'ERROR':
        return {
          isLoading: false,
          error: payload,
          data: {},
        };
      default:
        return state
    }
  }
  const [{ news, welcomeTxt, isLoading }, dispatch] = useReducer(reducer, initialState)

  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: { body: newsData } } = await sendRequest('GET', '/news?limit=4&sort=createdAt:DESC', null)
        const { data: { body: welcomeTxtData } } = await sendRequest('GET', '/organizations/1/public', null)
        const payload = {
          news: newsData,
          welcomeTxt: welcomeTxtData,
        }
        dispatch({ type: 'GET_DATA_OK', payload })
      } catch (e) {
        dispatch({ type: 'ERROR', payload: e })
        const { isConfirmed } = await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error obteniendo la información, intenta nuevamente.',
          confirmButtonText: 'Reintentar',
        })
        if (isConfirmed) {
          dispatch({ type: 'GET_DATA' })
          setToggle(!toggle)
        }
      }
    }
    getData()
  }, [toggle])

  return isLoading ? <Loader visible /> : <Home news={news} welcomeTxt={welcomeTxt} />
}

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
  welcomeTxt: PropTypes.string.isRequired,
}

export default HomeContainer
