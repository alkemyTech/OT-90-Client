import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../Component/Header'
import Backoffice from '../../Component/Backoffice'
import '../../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function BackofficeMain({ path }) {
  return (
    <div className="App">
      <Header />
      <Backoffice path={path} />
    </div>
  )
}

BackofficeMain.propTypes = {
  path: PropTypes.string.isRequired,
}

export default BackofficeMain
