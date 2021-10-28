/* eslint-disable react/prop-types */
import React from 'react'
import Spinner from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const Loader = ({ time = 3000, height = 100, width = 100 }) => (
  <Spinner
    type="Puff"
    color="#00BFFF"
    height={height}
    width={width}
    timeout={time}
  />
)

export default Loader
