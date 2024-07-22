import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ShowAlertContextProvider from './contexts/ShowAlert.jsx'
import AfterRegisterContextProvider from './contexts/AfterRegister.jsx'
import AnchorListContextProvider from './contexts/AnchorList.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShowAlertContextProvider>
      <AfterRegisterContextProvider>
        <AnchorListContextProvider>
          <App />
        </AnchorListContextProvider>
      </AfterRegisterContextProvider>
    </ShowAlertContextProvider>
  </React.StrictMode>,
)
