import axios from 'axios';

const API=axios.create({
baseURL:"http://localhost:5000",
header:{
  "Content-Type": "application/json",
},
withCredentials: true,
});
export default API;