import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Sidebar from './../components/organisms/Sidebar';
import General from './../components/pages/SidebarContent/General';
import Companies from './../components/pages/SidebarContent/Companies';
import Students from './../components/pages/SidebarContent/Students';
import Login from './../components/pages/Login';
import ProtectedRoute from './ProtectedRoute';
import { CssBaseline } from '@mui/material';

// Determines global theme:
const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches; // browser's theme
const theme = createTheme({
  palette: {
    mode: prefersDarkMode ? "dark" : "light"
  }
});

// Global language:
const language = "english"; // todo: api call

// Default route that sidebar will render: 
const defaultRoute = "/general";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter basename={"/khobleadmin"}>
        <Routes>
          <Route path='/login' element={<Login language={language} />} />
          <Route path='/' element={<Navigate replace to={defaultRoute} />} />
          <Route path={defaultRoute} element={
            <ProtectedRoute>
              <Sidebar language={language}/>
              <General language={language} />
            </ProtectedRoute>
          }
          />
          <Route path='/companies' element={
            <ProtectedRoute>
              <Sidebar language={language}/>
              <Companies language={language} />
            </ProtectedRoute>
          }
          />
          <Route path='/students' element={
            <ProtectedRoute>
              <Sidebar language={language}/>
              <Students language={language} />
            </ProtectedRoute>
          }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
