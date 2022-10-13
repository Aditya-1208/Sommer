import axios from "axios"
import { alert } from "./alert";

export const login = async (userId, password) => {
    try {
        const axiosConfig = {
            headers: {
                axiosReq: true
            }
        }
        const response = await axios.post('/api/v1/auth/login', {
            userId, password
        }, axiosConfig);
        alert('Logged in successfully', 'success');
        window.location.href = "/dashboard";
    } catch (error) {
        alert(error.response.data.message, 'danger');
    }
}
export const logout = async () => {
    try {
        const axiosConfig = {
            headers: {
                axiosReq: true
            }
        }
        const response = await axios.get('/api/v1/auth/logout', axiosConfig);
        alert('Logged out successfully', 'success');
        window.location.href = "/";
    } catch (error) {
        alert(error.response.data.message, 'danger');
    }
}

