import React, { useEffect, useReducer, useState } from 'react';
import AlertComponent from '../../Component/Alert';
import Loader from '../../Component/Loader';
import Table from '../../Component/Table'
import sendRequest from '../../httpClient'

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
          data: payload.body,
          error: null,
        };
      case 'ERROR':
        return {
          isLoading: false,
          error: payload,
          data: {},
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
  const [{ error, data, isLoading }, dispatch] = useReducer(reducer, initialState)

  const [toggle, setToggle] = useState(false)

  const alertAction = () => {
    dispatch({ type: 'GET_DATA' })
    setToggle(!toggle)
  }

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
      }
    }
    getNews()
  }, [toggle])

  const headers = ['name', 'image', 'createdAt']

  if (isLoading) {
    return <Loader visible />
  }
  return (
    error
      ? <AlertComponent show={!isLoading} title="Error obteniendo novedadades" variant="warning" action={alertAction} />
      : <Table title="Novedades" headers={headers} data={data} onDelete={deleteNew} />
  )
}

export default NewsContainer
