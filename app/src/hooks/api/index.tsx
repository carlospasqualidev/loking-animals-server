import axios from 'axios';

export const Api = axios.create({
  baseURL: 'http://10.32.1.186:8080/api/backoffice',
  headers: {
    Accept: '*/*',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Accept-Encondig': 'gzip, deflate, br',
  },
});
