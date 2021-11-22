import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from '../Component/Footer';
import TestimonyForm from '../Component/TestimonyForm';

function Testimonials() {
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
        <TestimonyForm />
      </div>
      <Footer />
    </div>
  )
}

export default Testimonials
