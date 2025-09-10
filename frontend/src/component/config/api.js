import axios from 'axios';

export const API_URL = "http://localhost:9090";
// export const API_URL = "http://10.51.202.82:9090";


export const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});


