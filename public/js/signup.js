import axios from "axios";
import { alert } from "./alert";

export const signup = async (userData) => {
    try {
        const axiosConfig = {
            headers: {
                axiosReq: true
            }
        }
        const response = await axios.post('/api/v1/auth/signup', userData, axiosConfig);
        alert('Registered successfully,welcome to Sommer', 'success');
        window.location.href = "/dashboard";
    } catch (error) {
        alert(error.response.data.message, 'danger');
    }
}