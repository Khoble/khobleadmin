import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react'
import ReactDOM from 'react-dom/client'
import '../../src/styles/index.css'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Sidebar from './../components/organisms/Sidebar';
import General from './../components/pages/SidebarContent/General';
import Companies from './../components/pages/SidebarContent/Companies';
import Students from './../components/pages/SidebarContent/Students';
import Login from './../components/pages/Login';
import ProtectedRoute from './ProtectedRoute';

// Determines global theme: 
const theme = createTheme({
  palette: {
    mode: "dark" // possible to toggle between 'dark' and 'light' themes
  }
});

// Global language:
const language = "english"; // todo: api call

// Default route that sidebar will render: 
const defaultRoute = "/general";

// Returns a siderbar component from a child, which is the component that corresponds to its main view
function getSidebarComponent(child: any) {
  return <Sidebar language={language} renderedContent={child} />;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={'/khobleadmin'}>
        <Routes>
          <Route path='/login' element={<Login language={language} />} />
          <Route path='/' element={<Navigate replace to={defaultRoute} />} />
          <Route path={defaultRoute} element={
            <ProtectedRoute>
              {getSidebarComponent(<General language={language} />)}
            </ProtectedRoute>
          }
          />
          <Route path='/companies' element={
            <ProtectedRoute>
              {getSidebarComponent(<Companies language={language} />)}
            </ProtectedRoute>
          }
          />
          <Route path='/students' element={
            <ProtectedRoute>
              {getSidebarComponent(<Students language={language} />)}
            </ProtectedRoute>
          }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
