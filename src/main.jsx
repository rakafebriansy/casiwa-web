import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ShowAlertContextProvider from './contexts/ShowAlert.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShowAlertContextProvider>
      <App />
    </ShowAlertContextProvider>
  </React.StrictMode>,
)
