import React from 'react'
import PropTypes from 'prop-types'
import ButtonComponent from './Button'

function renderCols(colNamess) {
  return colNamess.map((col) => <th scope="col">{col}</th>)
}

function renderRows(datas) {
  return datas.map((dat, index) => (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{dat.name}</td>
      <td>
        <ButtonComponent title="Editar" />
        <ButtonComponent title="Eliminar" variant="danger" />
      </td>
    </tr>
  ))
}

function Table(props) {
  const { colNames } = props
  const { data } = props
  return (
    <table className="table caption-top">
      <caption>Actividades</caption>
      <thead>
        <tr>
          <th scope="col">#</th>
          {renderCols(colNames)}
        </tr>
      </thead>
      <tbody>
        {renderRows(data)}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  colNames: PropTypes.node.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
}

export default Table
