import axios from 'axios';

export default axios.create({
  baseURL: 'https://twitch-server.herokuapp.com/'
});
