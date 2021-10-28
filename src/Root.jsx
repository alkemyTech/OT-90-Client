import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'

export default function Root() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/nosotros" component={() => '"Nostros" Screen under construction'} />
      </Switch>
    </Router>
  )
}
