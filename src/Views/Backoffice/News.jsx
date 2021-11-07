import React, { useEffect, useReducer, useState } from 'react';
import AlertComponent from '../../Component/Alert';
import Loader from '../../Component/Loader';
import Table from '../../Component/Table'

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
      const fetchNews = await fetch('http://localhost:3001/news')
      const newsJson = await fetchNews.json()
      if (!fetchNews.ok) {
        dispatch({ type: 'ERROR', payload: newsJson })
        return
      }
      dispatch({ type: 'GET_DATA_OK', payload: newsJson })
    }
    getNews()
  }, [toggle])

  const headers = ['name', 'image', 'conent']

  if (isLoading) {
    return <Loader visible />
  }
  return (
    error
      ? <AlertComponent show={!isLoading} title="Error obteniendo novedadades" variant="warning" action={alertAction} />
      : <Table title="Novedades" headers={headers} data={data} />
  )
}

export default NewsContainer
