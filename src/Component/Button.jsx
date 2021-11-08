import PropTypes from 'prop-types'
import React from 'react'
import Button from 'react-bootstrap/Button';
import Loader from './Loader';

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
  isLoading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
}
export default ButtonComponent
