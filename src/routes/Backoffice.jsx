import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

const Backoffice = (props) => {
  const { match } = props
  const { path } = match
  return (
    <Router>
      <Switch>
        <Route exact path={path} component={() => 'Main backoffice route'} />
        <Route path={`${path}/activities`} component={() => 'Activities backoffice route'} />
      </Switch>
    </Router>
  )
}

Backoffice.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Backoffice;
