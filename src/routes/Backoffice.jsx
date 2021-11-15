import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import AllTestimonial from '../Views/Backoffice/AllTestimonial'
import BackofficeMain from '../Views/Backoffice/Main'
import Categories from '../Views/Backoffice/Categories'
import Activities from '../Views/Backoffice/Activities'
import Conditional from './ConditionalRoute'
import Contacts from '../Views/Backoffice/Contacts'
import EditOrganization from '../Component/EditOrganization'
import News from '../Views/Backoffice/News'
import PropTypes from 'prop-types'
import React from 'react'
import Testimonials from '../Views/Testimonials'
import Users from '../Views/Backoffice/Users'
import { selectUser } from '../app/userSlice'

const Backoffice = (props) => {
  const isAdmin = useSelector(selectUser).role === 'admin'
  const { match } = props
  const { path } = match
  return (
    <Router>
      <Switch>
        <Route exact path={path} render={() => <BackofficeMain path={path} />} />
        <Conditional path={`${path}/activities`} component={Activities} conditionToOpen={isAdmin} pathRedirect={path} />
        <Conditional path={`${path}/categories`} component={Categories} conditionToOpen={isAdmin} pathRedirect={path} />
        <Conditional path={`${path}/contacts`} component={Contacts} conditionToOpen={isAdmin} pathRedirect={path} />
        <Conditional path={`${path}/editorganization/1`} component={EditOrganization} conditionToOpen={isAdmin} pathRedirect={path} />
        <Conditional path={`${path}/testimonials`} component={Testimonials} conditionToOpen={isAdmin} pathRedirect={path} />
        <Conditional exact path={`${path}/news`} component={News} conditionToOpen={isAdmin} pathRedirect={path} />
        <Conditional exact path={`${path}/users`} component={Users} conditionToOpen={isAdmin} pathRedirect={path} />
        <Conditional exact path={`${path}/alltestimonials`} component={AllTestimonial} conditionToOpen={isAdmin} pathRedirect={path} />
      </Switch>
    </Router>
  )
}
Backoffice.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};
export default Backoffice
