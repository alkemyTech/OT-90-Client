import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from '../Component/Footer';
import Table from '../Component/Table'
import Header from '../Component/Header';

const colNames = ['Nombre', 'Acciones']
const data = [{ name: 'Taller' }, { name: 'Paseos' }, { name: 'Taller' }, { name: 'Taller' }]

function Activities() {
  return (
    <div className="App">
      <Header />
      <div
        className="container"
        style={{
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Table tableName="Activities" colNames={colNames} data={data} />
      </div>
      <Footer />
    </div>
  )
}

export default Activities
