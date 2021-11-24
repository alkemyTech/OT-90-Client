import React, { useEffect, useReducer, useState } from 'react';
import Swal from 'sweetalert2';
import { Container } from 'react-bootstrap';
import Table from '../../Component/Table'
import sendRequest from '../../httpClient'
import Loader from '../../Component/Loader';

const Contacts = () => {
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
      case 'LOADING':
        return {
          isLoading: true,
          ...state,
        };
      case 'DELETE_OK': {
        const filter = state.data.filter(({ id }) => id !== payload)
        return {
          isLoading: false,
          error: null,
          data: filter,
        };
      }
      default:
        return state
    }
  }
  const [{ data, isLoading }, dispatch] = useReducer(reducer, initialState)

  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data: contacts } = await sendRequest('GET', '/contacts', null)
        dispatch({ type: 'GET_DATA_OK', payload: contacts })
      } catch (e) {
        dispatch({ type: 'ERROR', payload: e })
        const { isConfirmed } = await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error obteniendo la información, intenta nuevamente.',
          confirmButtonText: 'Reintentar',
          allowOutsideClick: false,
          allowEscapeKey: false,
        })
        if (isConfirmed) {
          dispatch({ type: 'GET_DATA' })
          setToggle(!toggle)
        }
      }
    }
    getCategory()
  }, [toggle])

  const delteContact = async (id) => {
    dispatch({ type: 'LOADING' })
    try {
      await sendRequest('DELETE', `/contacts/${id}`, null)
      dispatch({ type: 'DELETE_OK', payload: id })
      Swal.fire({
        icon: 'success',
        title: 'Contacto eliminado',
      })
    } catch (e) {
      dispatch({ type: 'ERROR', payload: e })
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrio un error borrando el contacto, intenta nuevamente.',
      })
    }
  }

  const headers = ['name', 'phone', 'email', 'message']

  return isLoading ? <Loader visible /> : (
    <Container style={{ minHeight: '100vh' }}>
      <Table title="Contactos" headers={headers} data={data} onDelete={delteContact} />
    </Container>
  )
}

export default Contacts
