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
import Footer from '../Component/Footer'
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
      <Header />
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="svg position-absolute d-none d-lg-block" style={{ height: '890px', width: '100%', 'z-index': '-10' }}>
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stopColor="hsl(216, 55%, 95.1%)" offset="0%" />
            <stop stopColor="hsl(216, 55%, 85.1%)" offset="100%" />
          </linearGradient>
        </defs>
        <path fill="url(#sw-gradient-0)" d="M 0.351 264.418 C 0.351 264.418 33.396 268.165 47.112 270.128 C 265.033 301.319 477.487 325.608 614.827 237.124 C 713.575 173.504 692.613 144.116 805.776 87.876 C 942.649 19.853 1317.845 20.149 1440.003 23.965 C 1466.069 24.779 1440.135 24.024 1440.135 24.024 L 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L 0.351 264.418 Z" />
      </svg>
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
      <Footer />
    </Router>
  )
}
