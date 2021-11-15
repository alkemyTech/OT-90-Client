import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types'
import {
  Card, Row, Col, Container,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from '../Component/Loader';
import Slider from '../Component/Slider';
import sendRequest from '../httpClient'
import Footer from '../Component/Footer';

const Home = ({ news }) => (
  <Container>
    <Slider />
    <h1 className="my-3">Bienvenido a Somos Mas</h1>
    <h2>Ultimas Novedades</h2>
    <Row xs={1} md={2} lg={4} className="g-4">
      {news.map(({ name, image, id }) => (
        <Col key={id}>
          <Card>
            <Link className="text-decoration-none text-dark" to={`/novedades/${id}`}>
              <Card.Img variant="top" src={image} />
              <Card.Body>
                <Card.Title>{name}</Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
    <Footer />
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
        const { data: { body } } = await sendRequest('GET', '/news?limit=4&sort=createdAt:DESC', null)
        dispatch({ type: 'GET_DATA_OK', payload: body })
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
    getNews()
  }, [toggle])

  return isLoading ? <Loader visible /> : <Home news={data} />
}

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default HomeContainer
