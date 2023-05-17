import axios from 'axios';


function getServerUrl() {
    if (process.env.NODE_ENV === 'production') return 'https://galleryapp-67bo.onrender.com'
    return "http://localhost:8080";
  }
  
  const instance = axios.create({
    baseURL: getServerUrl(),
    // timeout: 1000,
  });
  
  export default instance;