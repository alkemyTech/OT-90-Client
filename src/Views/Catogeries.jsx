import React from 'react';
import Table from '../Component/Table'
// import axios from 'axios'

const colName = ['Nombre', 'Acciones']
const data = [{ name: 'Taller' }, { name: 'Paseos' }, { name: 'Taller' }, { name: 'Taller' }]

function Categories() {
  return (
    <div className="container">
      <Table tableName="Categoria" colNames={colName} data={data} />
    </div>
  )
}

export default Categories
