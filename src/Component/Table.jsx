import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
// import Paginater from './Paginater'
import ButtonComponent from './Button'

function RenderRows({
  // eslint-disable-next-line no-alert
  data, headers, onDelete,
}) {
  const { location: { pathname }, push } = useHistory()
  const edit = (id) => push(`${pathname}/edit/${id}`)

  const openAlert = (id) => {
    Swal.fire({
      title: 'Atencion',
      html: '¿Esta seguro que desea eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id)
      }
    })
  }

  const type = (element, header) => {
    if (header === 'image') return <img style={{ maxWidth: '200px' }} src={element[header]} alt="" />
    if (header === 'createdAt') return element[header].substring(0, 10).split('-').reverse().join('-')
    return element[header]
  }
  return data.map((element) => (
    <tr key={element.id}>
      {headers.map((header) => (
        <td key={header}>
          {type(element, header)}
        </td>
      ))}
      <td>
        <div className="d-flex justify-content-evenly">
          <ButtonComponent isLoading={false} disabled={false} title="Editar" onClick={() => edit(element.id)} />
          <ButtonComponent isLoading={false} disabled={false} title="Eliminar" variant="danger" onClick={() => openAlert(element.id)} />
        </div>
      </td>
    </tr>
  ))
}

function TableComponent({
  // eslint-disable-next-line no-alert
  headers, data, title, onDelete,
}) {
  const [paginate, setPaginate] = useState(0)
  const [actualPage, setActualPage] = useState()

  const pagin = (n) => {
    setPaginate(n)
    window.scrollTo(0, document.body.scrollHeight);
  }

  useEffect(() => {
    setActualPage(data.slice(paginate, paginate + 9))
  }, [paginate, data])

  return (
    <Table striped responsive hover bordered className="caption-top table align-middle">
      <caption className="fs-2 my-4">{title}</caption>
      <thead>
        <tr>
          {headers.map((col) => <th key={col} className="text-capitalize" scope="col">{col}</th>)}
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody />
      {actualPage !== null && actualPage !== undefined
        ? <RenderRows data={actualPage} headers={headers} onDelete={onDelete} />
        : <h1> loading... </h1>}
      {/* {data !== undefined && data.length !== 0
        ? (
          <Paginater
            itemsPerPage={5}
            allItems={data}
            pagin={pagin}
            paginate={paginate}
            actualPage={actualPage}
            setPaginate={setPaginate}
          />
        )
        : null} */}
    </Table>
  )
}

TableComponent.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default TableComponent
