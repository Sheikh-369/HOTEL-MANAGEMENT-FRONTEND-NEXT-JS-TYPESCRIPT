import axios from "axios"

const APIWITHTOKEN = axios.create({
    baseURL : "http://localhost:3400/restaurant/", 
    headers : {
        "Authorization" : typeof window !== 'undefined' ? localStorage.getItem("token") : null,
        "Content-Type" : "application/json", // send vayirako data ko format 
        "Accept" : "application/json" // receive huda kasto type ko format ko receive garne 
    }
})

export default APIWITHTOKEN