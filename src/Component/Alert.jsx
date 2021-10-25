import PropTypes from 'prop-types'
import React from 'react'
import Alert from 'react-bootstrap/Alert'
import ButtonComponent from './Button'

const AlertComponent = ({
  show,
  title,
  content,
  variant,
  action,
}) => (
  <Alert show={show} variant={variant}>
    <Alert.Heading>{title}</Alert.Heading>
    {content && (
    <p>
      {content}
    </p>
    )}
    <hr />
    {action && (
    <div className="d-flex justify-content-end">
      <ButtonComponent title="Close" onClick={action} variant="outline-success">
        Close
      </ButtonComponent>
    </div>
    )}
  </Alert>
)

AlertComponent.defaultProps = {
  variant: 'success',
  content: null,
}

AlertComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  variant: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  action: PropTypes.func.isRequired,
}

export default AlertComponent
