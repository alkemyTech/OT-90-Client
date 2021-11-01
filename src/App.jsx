import React, { useState } from 'react'
import Swal from 'sweetalert2';
import ButtonComponent from './Component/Button'
import AlertComponent from './Component/Alert'
import Header from './Component/Header.jsx'
import Loader from './Component/Loader'
import './App.css'
import './static/styles/Alert.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const initialAlertState = { status: false, title: '', content: '' }

function App() {
  const [showAlert, setShowAlert] = useState(initialAlertState)
  const [visible, setVisible] = useState(false)

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
      <div className="alert-custom">
        <AlertComponent
          show={showAlert.status}
          action={() => closeAlert()}
          {...showAlert}
        />
      </div>
      <Loader visible={visible} />
      <header className="App-header">
        <ButtonComponent title="Test Button" onClick={() => openAlert()} />
      </header>
    </div>
  )
}

export default App
