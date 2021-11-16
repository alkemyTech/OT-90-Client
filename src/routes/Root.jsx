import React from 'react'
import { useSelector } from 'react-redux'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Backoffice from './Backoffice'
import Conditional from './ConditionalRoute'
import Contact from '../Views/Contact'
import Header from '../Component/Header'
import Home from '../Views/Home'
import Login from '../Views/Login'
import NewsDetail from '../Views/NewsDetail'
import ActivitiesDetail from '../Views/ActivitiesDetails'
import News from '../Views/News'
import Members from '../Views/members'
import Register from '../Component/Register'
import { selectUser } from '../app/userSlice'
// import App from '../App'

export default function Root() {
  const isLogged = useSelector(selectUser).isAuthenticated
  return (
    <Router>
      <Route path="/" component={Header} />
      <Switch>
        {/* <Route exact path="/" component={App} /> */}
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/novedades" component={News} />
        <Route exact path="/novedades/:id" component={NewsDetail} />
        <Route exact path="/actividades/:id" component={ActivitiesDetail} />
        <Route path="/nosotros" component={() => '"Nostros" Screen under construction'} />
        <Route exact path="/contacto" component={Contact} />
        <Route exact path="/members" component={Members} />
        <Conditional conditionToOpen={isLogged} component={Backoffice} pathRedirect="/" path="/backoffice" />
      </Switch>
    </Router>
  )
}
