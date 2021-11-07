import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
import ButtonComponent from './Button'

function RenderRows({ data, headers }) {
  // eslint-disable-next-line no-alert
  const edit = () => alert('Editar')
  // eslint-disable-next-line no-alert
  const deleteElement = () => alert('Eliminar')
  return data.map((element, index) => (
    <tr key={element.id}>
      <th scope="row">{index + 1}</th>
      {headers.map((header) => (
        <td key={header}>
          {header === 'image' ? <img style={{ maxWidth: '200px' }} src={element[header]} alt="" /> : element[header]}
        </td>
      ))}
      <td>
        <div className="d-flex justify-content-evenly">
          <ButtonComponent title="Editar" onClick={edit} />
          <ButtonComponent title="Eliminar" variant="danger" onClick={deleteElement} />
        </div>
      </td>
    </tr>
  ))
}

function TableComponent({ headers, data, title }) {
  return (
    <Table striped responsive hover bordered className="caption-top table align-middle">
      <caption>{title}</caption>
      <thead>
        <tr>
          <th scope="col">#</th>
          {headers.map((col) => <th key={col} className="text-capitalize" scope="col">{col}</th>)}
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <RenderRows data={data} headers={headers} />
      </tbody>
    </Table>
  )
}

TableComponent.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TableComponent
