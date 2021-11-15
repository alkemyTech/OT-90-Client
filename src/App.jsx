import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap';
import ButtonComponent from './Component/Button'
import AlertComponent from './Component/Alert'
import Header from './Component/Header'
import Loader from './Component/Loader'
import Backoffice from './Component/Backoffice'
import './App.css'
import './static/styles/Alert.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import CategoryForm from './Component/CategoryForm';
import { setLogged, logOut } from './app/userSlice'

const initialAlertState = { status: false, title: '', content: '' }

function App() {
  const [showAlert, setShowAlert] = useState(initialAlertState)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const openAlert = () => {
    Swal.fire({
      title: 'Alkemy',
      html: 'You clicked the button!',
      icon: 'success',
    })
    setVisible(true)
    setTimeout(() => setVisible(false), 2000)
  }

  const closeAlert = () => {
    setShowAlert(initialAlertState)
  }

  return (
    <div className="App">

      <Header />
      <Button onClick={() => dispatch(setLogged({
        id: 12, name: 'andres', lastName: 'Monsa', role: 'Admin', email: 'andres@monsa.com',
      }))}
      >
        {' '}
        SETLOGGED
      </Button>
      <Button onClick={() => dispatch(logOut())}> LOGOUT </Button>
      {/* lo dejo para que se visualice */}
      <Backoffice />
      <div className="alert-custom">
        <AlertComponent
          show={showAlert.status}
          action={() => closeAlert()}
          {...showAlert}
        />
      </div>
      <Loader visible={visible} />
      <header className="App-header">
        <ButtonComponent title="Test Button!" isLoading={false} disabled={false} onClick={() => openAlert()} />
      </header>

      <CategoryForm name="asd" description="description1" id={1} />
    </div>
  )
}

export default App
