import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Menu from './Menu'
import Industries from './components/pages/Industries'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Menu></Menu>}/>
        <Route path='/KPIs' element={<Menu></Menu>}/>
        <Route path='/Industries' element={<Industries></Industries>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
