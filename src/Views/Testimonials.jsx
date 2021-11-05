import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from '../Component/Footer';
import Header from '../Component/Header';

const colNames = ['Nombre', 'Acciones']

function Testimonials() {
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
        <Table colNames={colNames} data={data} />
      </div>
      <Footer />
    </div>
  )
}

export default Testimonials
