import React from 'react';
import Table from 'react-bootstrap/Table'
import './Views.css'
// import axios from 'axios'

function Categories() {
  return (
    <div className="Table">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>nombre</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th> 1</th>
            <th> prueba</th>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Categories
