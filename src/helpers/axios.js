import axios from "axios";
import { api } from "../urlConfig";

const authToken=window.localStorage.getItem("authToken")

const axiosInstance=axios.create({
    baseURL:api,
    headers:{
        "Authorization": authToken ? `Bearer ${authToken}` : "" 
    }
})

export default axiosInstance;