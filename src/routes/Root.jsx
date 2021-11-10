import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import App from '../App'
import Register from '../Component/Register'
import Home from '../Views/Home'
import Login from '../Views/Login'
import NewsDetail from '../Views/NewsDetail'
import Backoffice from './Backoffice'
import News from '../Views/News'
import Contact from '../Views/Contact'
import Conditional from './ConditionalRoute'

export default function Root() {
  const isAdmin = true
  const isLogged = true
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={App} /> */}
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/novedades" component={News} />
        <Route exact path="/novedades/:id" component={NewsDetail} />
        <Route path="/nosotros" component={() => '"Nostros" Screen under construction'} />
        <Route exact path="/contacto" component={Contact} />
        <Conditional conditionToOpen={isLogged && isAdmin} component={Backoffice} pathRedirect="/" path="/backoffice" />
      </Switch>
    </Router>
  )
}
