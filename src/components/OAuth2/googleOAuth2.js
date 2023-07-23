import React from 'react';
import {GoogleLogin} from '@react-oauth/google';
import axios from "axios";
import {useNavigate} from "react-router";

const GoogleOAuth2Login = () => {
    const navigate = useNavigate();
    const handleSuccess = (response) => {
        console.log('Đăng nhập thành công:', response);
        axios.post('http://localhost:8080/jwt/google', response.credential)
            .then((res) => {
                console.log(res)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("currentUser", JSON.stringify(res.data.user))
                localStorage.setItem("currentUserId", res.data.user.id)
                localStorage.setItem("currentUserRole", res.data.user.role)
                localStorage.setItem("currentUserApplyHost", res.data.user.applyHost)
                console.log(localStorage.getItem("currentUserApplyHost"))
                navigate('/')
            })
            .catch(() => {
                navigate('/login')
                alert('Login failed')
            })
    };

    // Hàm xử lý khi đăng nhập thất bại
    const handleFailure = (error) => {
        console.log('Đăng nhập thất bại:', error);
    };

    return (
        <div>
            <GoogleLogin
                buttonText="Sign in with Google"
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default GoogleOAuth2Login;
