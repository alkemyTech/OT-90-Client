import React, { useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom'
import Table from '../../Component/Table'
import sendRequest from '../../httpClient'
import Loader from '../../Component/Loader';
import AlertComponent from '../../Component/Alert';

const Categories = () => {
  const initialState = {
    data: {},
    isLoading: true,
    error: null,
  }

  const history = useHistory()

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

  const toCreateCategory = () => {
    history.push('/backoffice/categories/create')
  }

  const alertAction = () => {
    dispatch({ type: 'GET_DATA' })
    setToggle(!toggle)
  }

  const deleteCategories = async (id) => {
    try {
      const response = await sendRequest('DELETE', `/categories/${id}`, null)
      dispatch({ type: 'DELETE_OK', payload: response, deleted: { id, data } })
    } catch (e) {
      dispatch({ type: 'ERROR', payload: e })
    }
  }

  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data: categories } = await sendRequest('GET', '/categories', null)
        dispatch({ type: 'GET_DATA_OK', payload: categories })
      } catch (e) {
        dispatch({ type: 'ERROR', payload: e })
      }
    }
    getCategory()
  }, [toggle])

  const headers = ['name', 'description']

  if (isLoading) {
    return <Loader visible />
  }
  return (
    error
      ? <AlertComponent show={!isLoading} title="Error obteniendo categorias" variant="warning" action={alertAction} />
      : (
        <>
          <button onClick={toCreateCategory}> Agregar Categoría</button>
          <Table title="Categorias" headers={headers} data={data} onDelete={deleteCategories} />
        </>
      )
  )
}

export default Categories
