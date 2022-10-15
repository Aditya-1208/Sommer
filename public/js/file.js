import axios from 'axios';
import { alert } from './alert';

window.uploadFile = async (e) => {
    var submitBtn = e.srcElement.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'uploading'
    try {
        e.preventDefault()
        const formData = new FormData(e.srcElement);
        const file = formData.get('subtask_file');
        const url = e.srcElement.dataset.url
        console.log(file, url);
        const response = await axios.post(url, formData, { headers: { axiosReq: true } });
        alert('Uploaded file successfully', 'success');
    } catch (error) {
        alert(error.response.data.message, 'danger');
    }
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'upload'
}
window.downloadFile = async (e, url) => {
    const downloadBtn = e.srcElement;
    downloadBtn.disabled = true;
    downloadBtn.innerHTML = "downloading"
    try {
        const response = await axios.get(url, { headers: { axiosReq: true }, responseType: 'blob' });
        const href = URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', response.headers.filename); //or any other extension
        document.body.appendChild(link);
        link.click();
        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    } catch (error) {
        alert(error.response.data.message, 'danger');
    }
    downloadBtn.disabled = false;
    downloadBtn.innerHTML = "download"
}