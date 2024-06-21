import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ProviderHub from './contexts/ProviderHub.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProviderHub>
      <App />
    </ProviderHub>
  </React.StrictMode>
)
