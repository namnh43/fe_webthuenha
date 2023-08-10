import axios from 'axios';
import Swal from "sweetalert2";

// Hàm utility sử dụng Axios để lấy dữ liệu
export const fetchData = async (url, params = {}) => {
    try {
        const response = await axios.get(url, params);
        return response.data;
    } catch (error) {
        // Xử lý lỗi ở đây nếu cần thiết
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Hàm utility sử dụng Axios để thực hiện yêu cầu POST
export const postData = async (url, data, params) => {
    try {
        const response = await axios.post(url, data, params);
        return response.data;
    } catch (error) {
        // Xử lý lỗi ở đây nếu cần thiết
        console.error('Error posting data:', error);
        throw error;
    }
};
export const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
}

export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const removeById = (list,id) => {

}

export const showLoadingAlert = () => {
    Swal.fire({
        title: 'Loading',
        icon: 'info',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
            setTimeout(() => {
                Swal.close();
            }, 700);
        }
    });
};