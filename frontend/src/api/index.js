import axios from 'axios';

// var url;
// if( process.env.NODE_ENV === 'development') {
//   url = `http://localhost:8080/dummy/`;
// }
// axios.defaults.withCredentials = true;
// axios.defaults.crossorigin = true
var req = axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials: true,
    crossorigin: true
});


export default req
