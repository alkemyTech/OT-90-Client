import React, { useState } from 'react'
import ButtonComponent from './Component/Button'
import AlertComponent from './Component/Alert';

import './App.css'
import './static/styles/Alert.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const initialAlertState = { status: false, title: '', content: '' }

function App() {
  const [showAlert, setShowAlert] = useState(initialAlertState)

  const openAlert = () => {
    setShowAlert({
      status: true,
      title: 'Message Alert',
      content: 'Content of alert component',
    })
  }

  const closeAlert = () => {
    setShowAlert(initialAlertState)
  }

  return (
    <div className="App">
      <div className="alert-custom">
        <AlertComponent show={showAlert.status} action={() => closeAlert()} {...showAlert} />
      </div>
      <header className="App-header">
        <ButtonComponent title="Test Button" onClick={() => openAlert()} />
      </header>
    </div>
  )
}

export default App
