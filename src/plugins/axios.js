import axios from 'axios';

const apiKey = 'af12017dfb2fba11faccea7b311e47c6';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: apiKey,
  },
});

export default axiosInstance;
