import axios from 'axios';

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

export const removeById = (list,id) => {

}