import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import App from '../App'
import { useSelector } from 'react-redux'
import Register from '../Component/Register'
import Home from '../Views/Home'
import Login from '../Views/Login'
import NewsDetail from '../Views/NewsDetail'
import Backoffice from './Backoffice'
import News from '../Views/News'
import Contact from '../Views/Contact'
import Members from '../Views/members'
import Conditional from './ConditionalRoute'
import { selectUser } from '../app/userSlice'

export default function Root() {
  const isLogged = useSelector(selectUser).isAuthenticated
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
        <Route exact path="/members" component={Members} />
        <Route path="/backoffice" component={Backoffice} />
        <Conditional conditionToOpen={isLogged} component={Backoffice} pathRedirect="/" path="/backoffice" />
      </Switch>
    </Router>
  )
}
