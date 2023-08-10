import axios, { AxiosHeaders } from 'axios';

const debugMode = 'http://localhost:8000/api';
const productionMode = 'https://dev.khoble.com/api';
const verguitaMode = "https://web.khoble.com/api";

const khobleAPI = axios.create({
  // baseURL: window.location.host.includes('localhost')
  //   ? debugMode
  //   : productionMode,
  baseURL: verguitaMode,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    session: localStorage.getItem("khoble-session"),
  },
});

khobleAPI.interceptors.response.use(
  response => response,
  error => {
    if (error.code.includes('ERR_NETWORK', 'ECONNABORTED')) {
      alert('Hubo un error, por favor intente de nuevo');
    } else if (error.response.status === 401) { /* Redirect to login if session has expired: */
      localStorage.removeItem('session');
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default khobleAPI;