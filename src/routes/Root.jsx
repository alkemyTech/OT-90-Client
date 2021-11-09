import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../App'
import Register from '../Component/Register'
import Login from '../Views/Login'
import NewsDetail from '../Views/NewsDetail'
import Backoffice from './Backoffice'
import News from '../Views/News'

export default function Root() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/novedades" component={News} />
        <Route exact path="/novedades/:id" component={NewsDetail} />
        <Route path="/nosotros" component={() => '"Nostros" Screen under construction'} />
        <Route path="/backoffice" component={Backoffice} />
      </Switch>
    </Router>
  )
}
