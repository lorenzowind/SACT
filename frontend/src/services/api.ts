import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-18-219-59-120.us-east-2.compute.amazonaws.com/',
});

export default api;
