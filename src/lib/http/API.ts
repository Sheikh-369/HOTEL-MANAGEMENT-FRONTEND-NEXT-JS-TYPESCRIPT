import axios from "axios";
const API=axios.create({
    baseURL:"http://localhost:3400/restaurant/",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
})
export default API