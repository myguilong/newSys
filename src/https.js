import axios from 'axios'
const http = axios.create({
    baseURL:'http://localhost:80/apis',
    withCredentials: true 
})
export default http