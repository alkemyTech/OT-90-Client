import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import App from '../App'
import { useSelector } from 'react-redux'
import Register from '../Component/Register'
import Header from '../Component/Header'
import Home from '../Views/Home'
import Login from '../Views/Login'
import News from '../Views/News'
import NewsDetail from '../Views/NewsDetail'
import React from 'react'
import Register from '../Component/Register'
import Contact from '../Views/Contact'
import Conditional from './ConditionalRoute'
import { selectUser } from '../app/userSlice'

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
        <Route path="/nosotros" component={() => '"Nostros" Screen under construction'} />
        <Route exact path="/contacto" component={Contact} />
        <Conditional conditionToOpen={isLogged} component={Backoffice} pathRedirect="/" path="/backoffice" />
      </Switch>
    </Router>
  )
}
