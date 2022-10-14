import axios from 'axios'
import { alert } from './alert'
export const createNewTask = async (url, method, formData) => {
    const data = {};
    for (let [key, val] of formData)
        data[key] = val;
    console.log(data);
    try {
        const response = await axios.request({
            url,
            method,
            data,
            headers: {
                axiosreq: true
            }
        })
        alert('Successfully created task', 'success');
        window.location.href = `/dashboard/${data.club}`

    } catch (error) {
        console.log(error);
        alert(error.response.data.message, 'danger');
    }
}