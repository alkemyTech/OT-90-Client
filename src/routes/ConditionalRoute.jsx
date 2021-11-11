import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

export const ConditionalRoute = ({
  conditionToOpen: condition,
  component: Component,
  pathRedirect,
  ...propsRoute
}) => (
  <Route
    {...propsRoute}
    render={(props) => (condition ? <Component {...props} /> : <Redirect to={pathRedirect} />)}
  />
)

ConditionalRoute.propTypes = {
  conditionToOpen: PropTypes.bool.isRequired,
  component: PropTypes.elementType.isRequired,
  pathRedirect: PropTypes.string.isRequired,
}

export default ConditionalRoute
