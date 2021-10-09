import axios from 'axios';

// var url;
// if( process.env.NODE_ENV === 'development') {
//   url = `http://localhost:8080/dummy/`;
// }

export default axios.create({
    baseURL: "http://localhost:8080/",
});