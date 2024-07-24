import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ShowAlertContextProvider from './contexts/ShowAlert.jsx'
import AnchorListContextProvider from './contexts/AnchorList.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShowAlertContextProvider>
      <AnchorListContextProvider>
        <App />
      </AnchorListContextProvider>
    </ShowAlertContextProvider>
  </React.StrictMode>,
)
