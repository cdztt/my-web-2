import axios from 'axios';

export default axios.create({
  baseURL: 'https://124.223.92.23/api/',
  // baseURL: 'https://localhost/api/',
  headers: {
    token: '22/7/13/18/57',
  },
});
