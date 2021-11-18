import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import App from '../App'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
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
import sendRequest from '../httpClient'
import Loader from '../Component/Loader'

export default function Root() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(selectUser)
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user-data'))
    if (!isAuthenticated && userData) {
      sendRequest('GET', '/auth/me', null)
        .then(({ data }) => {
          dispatch(setLogged(data.body))
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrio un Error, intenta nuevamente',
          })
        })
        .finally(setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [isAuthenticated, dispatch])
  if (isLoading) return <Loader visible />
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
        <Route exact path="/members" component={Member} />
        <Route path="/nosotros" component={About} />
        <Route exact path="/contacto" component={Contact} />
        <Conditional conditionToOpen={isAuthenticated} component={Backoffice} pathRedirect="/" path="/backoffice" />
      </Switch>
    </Router>
  )
}
