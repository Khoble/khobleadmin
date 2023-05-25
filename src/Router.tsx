import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/styles/index.css'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Sidebar from './components/organisms/Sidebar';
import GeneralKPIs from './components/pages/KPIs/GeneralKPIs';
import CompanyKPIs from './components/pages/KPIs/CompanyKPIs';
import StudentKPIs from './components/pages/KPIs/StudentKPIs';

// Determine's global theme: 
const theme = createTheme({
  palette: {
    mode: 'dark' // possible to toggle between 'dark' and 'light' themes
  }
});

// Global language:
const language = "english"; // todo: api call

// Default route that sidebar will render: 
const defaultRoute = "/KPIs/general";

// Returns a siderbar component from a child, which is the component that corresponds to its main view
function getSidebarComponent(child: any) {
  return <Sidebar language={language} renderedContent={child} />;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={'/khobleadmin'}>
        <Routes>
          <Route path='/' element={<Navigate replace to={defaultRoute} />}/>
          <Route path='/KPIs/general' element={getSidebarComponent(<GeneralKPIs language={language} />)} />
          <Route path='/KPIs/companies' element={getSidebarComponent(<CompanyKPIs language={language} />)} />
          <Route path='/KPIs/students' element={getSidebarComponent(<StudentKPIs language={language}/>)} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
