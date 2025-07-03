import axios, { type AxiosResponse } from 'axios';

const http = axios.create({
  baseURL: '/',
  headers: {
  },
});

export default http;
