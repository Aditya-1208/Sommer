import axios from "axios";
import { alert } from "./alert";

window.deleteByParam = async (url) => {
    try {
        console.log(url);
        const response = await axios.request({
            url,
            method: 'delete',
            headers: {
                axiosReq: true
            }
        });
        alert('Deleted successfully', "success");
        location.reload();
    } catch (error) {
        console.log(error);
        alert(error.response.data.message, 'danger');
    }
}