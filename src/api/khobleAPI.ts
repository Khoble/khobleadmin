import axios, { AxiosHeaders } from 'axios';

const debugMode = 'http://localhost:8000/api';
const productionMode = 'https://dev.khoble.com/api';

const khobleAPI = axios.create({
  baseURL: window.location.host.includes('localhost')
    ? debugMode
    : productionMode,
  timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//     session: localStorage.getItem('session'),
//   },
});

export default khobleAPI;