import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-90db6.firebaseio.com/'
});

export default instance;
