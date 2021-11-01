/* eslint-disable react/prop-types */
import React from 'react'
import Spinner from 'react-loader-spinner'
import '../static/styles/Loader.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const Loader = ({
  height = 500, width = 500, visible = false,
}) => (
  <Spinner
    type="Circles"
    color="#00BFFF"
    height={height}
    width={width}
    visible={visible}
    className="loader"
  />
)

export default Loader
