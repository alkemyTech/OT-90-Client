import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AlertComponent from '../Component/Alert';
import Loader from '../Component/Loader';
import sendRequest from '../httpClient'

const ActivitiesDetail = ({ data }) => {
  const { image, name, content } = data
  const notFounded = Object.keys(data).length === 0
  return (
    <Row className="justify-content-center min-vh-100 m-0 align-content-center">
      <Col sm="10" className="p-4 p-md-0">
        {notFounded ? <h1 className="text-center">Novedad no encontrada</h1>
          : (
            <article>
              <img src={image} alt="activities" className="mx-auto d-block" />
              <h1>{name}</h1>
              <p>{content}</p>
            </article>
          )}
      </Col>
    </Row>
  )
}

const ActivitiesDetailContainer = () => {
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
  const { id } = useParams()

  const alertAction = () => {
    dispatch({ type: 'GET_DATA' })
    setToggle(!toggle)
  }

  useEffect(() => {
    const getActivities = async () => {
      try {
        const { data: activities } = await sendRequest('GET', `/activities/${id}`, null)
        dispatch({ type: 'GET_DATA_OK', payload: activities })
      } catch (e) {
        dispatch({ type: 'ERROR', payload: e })
      }
    }
    getActivities()
  }, [id, toggle])

  if (isLoading) {
    return <Loader visible />
  }
  return (
    error ? <AlertComponent show={!isLoading} title="Error obteniendo novedad" variant="warning" action={alertAction} /> : <ActivitiesDetail data={data} />
  )
}

ActivitiesDetail.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
}

export default ActivitiesDetailContainer