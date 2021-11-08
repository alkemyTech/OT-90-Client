import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types'
import {
  Col, Row, Card, Container,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AlertComponent from '../Component/Alert';
import Loader from '../Component/Loader';
import sendRequest from '../httpClient'

const News = ({ news }) => (
  <Container>
    <h1 className="p-3 mt-4">{news.length ? 'Novedades' : 'Sin Novedades' }</h1>
    <Row xs={1} md={2} lg={4} className="g-4 p-3">
      {news.map(({
        image, name, id,
      }) => (
        <Col key={id}>
          <Card>
            <Link className="text-dark text-decoration-none" to={`/novedades/${id}`}>
              <Card.Img variant="top" src={image} />
              <Card.Body>
                <Card.Title className="text-capitalize">{name}</Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
)

const NewsContainer = () => {
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
        const { data: news } = await sendRequest('GET', '/news', null)
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
    error ? <AlertComponent show={!isLoading} title="Error obteniendo novedadades" variant="warning" action={alertAction} /> : <News news={data} />
  )
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
