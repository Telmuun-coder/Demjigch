import axios from 'axios';

const headers = {'Content-Type': 'application/json'};
const instance = axios.create({
  baseURL: 'http://192.168.137.1:8081/',
  headers,
});

export default instance;
