import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types'
import {
  Card, Row, Col, Container,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AlertComponent from '../Component/Alert';
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
    const { type, payload = {} } = action
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
          data: payload,
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
  const [{ error, data, isLoading }, dispatch] = useReducer(reducer, initialState)

  const [toggle, setToggle] = useState(false)

  const alertAction = () => {
    dispatch({ type: 'GET_DATA' })
    setToggle(!toggle)
  }

  useEffect(() => {
    const getNews = async () => {
      try {
        const { data: news } = await sendRequest('GET', '/news?limit=4', null)
        dispatch({ type: 'GET_DATA_OK', payload: news })
      } catch (e) {
        dispatch({ type: 'ERROR', payload: e })
      }
    }
    getNews()
  }, [toggle])

  if (isLoading) {
    return <Loader visible />
  }
  return (
    error
      ? <AlertComponent show={!isLoading} title="Error obteniendo novedadades" variant="warning" action={alertAction} />
      : <Home news={data} />
  )
}

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default HomeContainer
