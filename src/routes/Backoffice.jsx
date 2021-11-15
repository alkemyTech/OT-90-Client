import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Categories from '../Views/Backoffice/Categories'
import Contacts from '../Views/Backoffice/Contacts'
import Testimonials from '../Views/Testimonials'
import Activities from '../Views/Backoffice/Activities'
import News from '../Views/Backoffice/News'
import Users from '../Views/Backoffice/Users'
import Conditional from './ConditionalRoute'
import { selectUser } from '../app/userSlice'
import BackofficeMain from '../Views/Backoffice/Main'
import AllTestimonial from '../Views/Backoffice/AllTestimonial'

const Backoffice = (props) => {
  const isAdmin = useSelector(selectUser).role === 'admin'
  const { match } = props
  const { path } = match
  return (
    <Router>
      <Switch>
        <Route exact path={path} component={() => 'Main backoffice route'} />
        <Route path={`${path}/activities`} component={Activities} />
        <Route path={`${path}/categories`} component={Categories} />
        <Route path={`${path}/contacts`} component={Contacts} />
        <Route path={`${path}/testimonials`} component={Testimonials} />
        <Route exact path={`${path}/news`} component={News} />
        <Route exact path={`${path}/users`} component={Users} />
        <Route path={`${path}/alltestimonials`} component={AllTestimonial} />
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
