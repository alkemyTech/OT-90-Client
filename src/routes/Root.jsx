import React from 'react'

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import App from '../App'
import { useSelector, useDispatch } from 'react-redux'
import Register from '../Component/Register'
import About from '../Views/About'
import ActivitiesDetail from '../Views/ActivitiesDetails'
import Backoffice from './Backoffice'
import Conditional from './ConditionalRoute'
import Contact from '../Views/Contact'
import Header from '../Component/Header'
import Home from '../Views/Home'
import Login from '../Views/Login'
import News from '../Views/News'
import Member from '../Views/Members'
import NewsDetail from '../Views/NewsDetail'
import { selectUser, setLogged } from '../app/userSlice'

export default function Root() {
  const dispatch = useDispatch()
  let isLogged = useSelector(selectUser).isAuthenticated

  const { isAuthenticated } = useSelector(selectUser)
  const userData = JSON.parse(localStorage.getItem('user-data'))
  if (!isAuthenticated && userData) {
    dispatch(setLogged(userData))
    isLogged = true
  }
  return (
    <Router>
      <Route path="/" component={Header} />
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={1000}
            classNames="fade"
          >
            <Switch location={location}>
              {/* <Route exact path="/" component={App} /> */}
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/novedades" component={News} />
              <Route exact path="/novedades/:id" component={NewsDetail} />
              <Route exact path="/actividades/:id" component={ActivitiesDetail} />
              <Route exact path="/members" component={Member} />
              <Route path="/nosotros" component={About} />
              <Route exact path="/contacto" component={Contact} />
              <Conditional conditionToOpen={isLogged} component={Backoffice} pathRedirect="/" path="/backoffice" />

            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
      />
    </Router>
  )
}
