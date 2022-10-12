import axios from "axios";
import { alert } from "./alert";

export const signup = async (userData) => {
    try {
        const response = await axios.post('/api/v1/auth/signup', userData);
        alert('Registered successfully,welcome to Sommer', 'success');
        window.location.href = "/dashboard";
    } catch (error) {
        alert(error.response.data.message, 'danger');
    }
}