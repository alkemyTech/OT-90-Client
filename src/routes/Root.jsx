import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../App'
import Login from '../Views/Login'

export default function Root() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route path="/nosotros" component={() => '"Nostros" Screen under construction'} />
      </Switch>
    </Router>
  )
}
