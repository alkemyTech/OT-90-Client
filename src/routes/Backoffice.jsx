import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import Activities from '../Views/Backoffice/Activities'
import News from '../Views/Backoffice/News'

const Backoffice = (props) => {
  const { match } = props
  const { path } = match
  return (
    <Router>
      <Switch>
        <Route exact path={path} component={() => 'Main backoffice route'} />
        <Route path={`${path}/activities`} component={Activities} />
        <Route exact path={`${path}/news`} component={News} />
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
