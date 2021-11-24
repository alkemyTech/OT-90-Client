import PropTypes from 'prop-types'
import '../static/styles/Loader.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import React from 'react'
import Spinner from 'react-loader-spinner'

const Loader = ({
  height, width, visible, className,
}) => (
  <Spinner
    type="Circles"
    color="#00BFFF"
    height={height}
    width={width}
    visible={visible}
    className={className}
  />
)
Loader.defaultProps = {
  height: 500,
  width: 500,
  visible: false,
  className: 'loader',
}
Loader.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  visible: PropTypes.bool,
  className: PropTypes.string,
}

export default Loader
