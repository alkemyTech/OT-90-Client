import Button from 'react-bootstrap/Button';
import Loader from './Loader';
import PropTypes from 'prop-types'
import React from 'react'

const ButtonComponent = ({
  title, variant, onClick, isLoading = false, disabled = false,
}) => (
  <Button variant={variant} onClick={onClick} disabled={disabled}>
    { isLoading ? <Loader visible={isLoading} width={20} height={20} className="" /> : title }
  </Button>
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
