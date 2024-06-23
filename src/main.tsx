import React from 'react'
import ReactDOM from 'react-dom/client'
import ProviderHub from './contexts'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProviderHub>
      <App />
    </ProviderHub>
  </React.StrictMode>
)
