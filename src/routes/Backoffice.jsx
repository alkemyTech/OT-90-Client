import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import Testimonials from '../Views/Testimonials'
import Activities from '../Views/Backoffice/Activities'
import News from '../Views/Backoffice/News'
import Users from '../Views/Backoffice/Users'

const Backoffice = (props) => {
  const { match } = props
  const { path } = match
  return (
    <Router>
      <Switch>
        <Route exact path={path} component={() => 'Main backoffice route'} />
        <Route path={`${path}/activities`} component={Activities} />
        <Route path={`${path}/testimonials`} component={Testimonials} />
        <Route exact path={`${path}/news`} component={News} />
        <Route exact path={`${path}/users`} component={Users} />
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
