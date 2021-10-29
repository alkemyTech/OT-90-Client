import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../App'
import Register from '../Component/Register'

export default function Root() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route
          path="/nosotros"
          component={() => '"Nostros" Screen under construction'}
        />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  )
}
