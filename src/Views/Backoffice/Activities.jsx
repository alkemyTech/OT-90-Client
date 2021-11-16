import React, { useEffect, useReducer, useState } from 'react';
import Table from '../../Component/Table'
import sendRequest from '../../httpClient'
import Loader from '../../Component/Loader';
import AlertComponent from '../../Component/Alert';

const Activities = () => {
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
    const getCategory = async () => {
      try {
        const { data: contacts } = await sendRequest('GET', '/activities', null)
        dispatch({ type: 'GET_DATA_OK', payload: contacts })
      } catch (e) {
        dispatch({ type: 'ERROR', payload: e })
      }
    }
    getCategory()
  }, [toggle])

  const headers = ['name', 'conent', 'image']

  if (isLoading) {
    return <Loader visible />
  }
  return (
    error
      ? <AlertComponent show={!isLoading} title="Error obteniendo actividades" variant="warning" action={alertAction} />
      : <Table title="Actividades" headers={headers} data={data} />
  )
}
export default Activities
