import axios from 'axios';

const client = axios.create({
  timeout: 10000, // Set a timeout for requests
});

export default client;
