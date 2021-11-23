import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types'
import {
  Col, Row, Card, Container,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from '../Component/Loader';
import sendRequest from '../httpClient'

const Activities = ({ activities }) => (
  <Container>
    <h1 className="p-3">{activities.length ? 'Actividades' : 'Sin Actividades' }</h1>
    <Row xs={1} md={3} lg={4} className="g-4 p-3">
      {activities.map(({
        image, name, id,
      }) => (
        <Col key={id}>
          <Card>
            <Link className="text-dark text-decoration-none" to={`/actividades/${id}`}>
              <Card.Img src={image} />
              <Card.Title style={{maxHeight: '30px', maxWidth: '189px'}} className="text-capitalize">{name}</Card.Title>
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
)

const ActivitiesContainer = () => {
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
    const getActivities = async () => {
      try {
        const { data: { body } } = await sendRequest('GET', '/activities', null)
        dispatch({ type: 'GET_DATA_OK', payload: body })
      } catch (e) {
        dispatch({ type: 'ERROR', payload: e })
        const { isConfirmed } = await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error obteniendo las actividades, intenta nuevamente.',
          confirmButtonText: 'Reintentar',
        })
        if (isConfirmed) {
          dispatch({ type: 'GET_DATA' })
          setToggle(!toggle)
        }
      }
    }
    getActivities()
  }, [toggle])
  return isLoading ? <Loader visible /> : <Activities activities={data} />
}

Activities.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default ActivitiesContainer
