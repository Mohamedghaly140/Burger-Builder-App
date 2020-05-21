import axios from 'axios';

const Instance = axios.create({
  baseURL: 'https://react-burger-cbb4d.firebaseio.com/'
});

export default Instance;