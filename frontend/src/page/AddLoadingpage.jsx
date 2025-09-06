import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddLoadingpage() {
    const navigate = useNavigate();
    const phone = localStorage.getItem('phone');
    
    const requestBody = {
        phone,
        password: "kakao12341234!?",

    }
    axios('https://healody.shop/api/auth/kakao/login',  {
        data: requestBody,
        method: 'POST',
    })
    .then(function(response) {
        alert('카카오 로그인이 되셨습니다')
        console.log(response);
        const token = response.data.token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate('/my_today');

    })
    .catch(function(error) {
        console.log(error.response.status);
    })
}
export default AddLoadingpage;