import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import Categories from '../Views/Backoffice/Catogeries'
import Contacts from '../Views/Backoffice/Contacts'
import Testimonials from '../Views/Testimonials'
import Activities from '../Views/Backoffice/Activities'
import News from '../Views/Backoffice/News'
import BackofficeMainView from '../Views/Backoffice/Main'
import Users from '../Views/Backoffice/Users'

const Backoffice = (props) => {
  const { match } = props
  const { path } = match
  return (
    <Router>
      <Switch>
        <Route exact path={path} component={BackofficeMainView} />
        <Route path={`${path}/activities`} component={Activities} />
        <Route path={`${path}/categories`} component={Categories} />
        <Route path={`${path}/contacts`} component={Contacts} />
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
