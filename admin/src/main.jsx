import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminContextProvider from './context/AdminContext.jsx'
import AlumniContextProvider from './context/AlumniContext.jsx'
import AppContextProvider from './context/AppContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AdminContextProvider>
    <AlumniContextProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
       </AlumniContextProvider>
    </AdminContextProvider>
    </BrowserRouter>,
)
