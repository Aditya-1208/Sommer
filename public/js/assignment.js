import axios from 'axios';
import { alert } from './alert';

window.assignment = async (url, flag) => {
    try {
        const response = await axios.post(url, {}, { headers: { axiosReq: true } });
        alert(`${flag ? 'Assigned' : 'Left'} Subtask`, "success");
        location.reload();
    } catch (error) {
        alert(error.response.data.message, 'danger');
    }
}