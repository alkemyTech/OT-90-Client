import PropTypes from 'prop-types'
import React from 'react'

const AlertComponent = ({ msg, type }) => (
  <div className={`alert ${type}`} role="alert">
    {msg}
  </div>
)

AlertComponent.defaultProps = {
  type: 'alert-primary',
}
AlertComponent.propTypes = {
  msg: PropTypes.string.isRequired,
  type: PropTypes.string,
}
export default AlertComponent
