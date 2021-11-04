import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../App'
import Register from '../Component/Register'
import Login from '../Views/Login'
import Backoffice from './Backoffice'

export default function Root() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route path="/nosotros" component={() => '"Nostros" Screen under construction'} />
        <Route path="/backoffice" component={Backoffice} />
      </Switch>
    </Router>
  )
}
