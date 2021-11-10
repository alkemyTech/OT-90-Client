import React from 'react'
import Header from '../../Component/Header'
import Backoffice from '../../Component/Backoffice'
import '../../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function BackofficeMain() {
  return (
    <div className="App">
      <Header />
      <Backoffice />
    </div>
  )
}

export default BackofficeMain
