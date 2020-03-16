import axios from 'axios';

export default axios.create({
  baseURL: 'https://api-server-2.herokuapp.com'
});
