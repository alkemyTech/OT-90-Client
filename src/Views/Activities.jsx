import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from '../Component/Footer';
import Table from '../Component/Table'

const colNames = ['Nombre', 'Acciones']
const data = [{ name: 'pep' }, { name: 'pep' }, { name: 'pep' }]

function Activities() {
  return (
    <div className="App">
      <div
        className="container"
        style={{
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Table colNames={colNames} data={data} />
      </div>
      <Footer />
    </div>
  )
}

export default Activities
