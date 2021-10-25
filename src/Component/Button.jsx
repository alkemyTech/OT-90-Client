import PropTypes from 'prop-types'
import React from 'react'
import Button from 'react-bootstrap/Button';

const ButtonComponent = ({ title, variant, onClick }) => (
  <Button variant={variant} onClick={onClick}>{title}</Button>
)

ButtonComponent.defaultProps = {
  variant: 'primary',
}
ButtonComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
}
export default ButtonComponent
