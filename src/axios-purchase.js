import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pet-shop-586ce-default-rtdb.firebaseio.com/'
});

export default instance;
