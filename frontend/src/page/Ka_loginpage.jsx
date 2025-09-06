import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import BackIcon from "../img/back_icon.png";
import LoginFalse from "../img/login_false.png";
import axios from 'axios';


function Ka_loginpage() {
    const navigate = useNavigate();
    const requestBody = {
        phone: localStorage.getItem('phone'),
        password: "kakao12341234!?",
    };
    axios('https://healody.shop/api/auth/kakao/login', {
        data: requestBody,
        method: 'POST',
    })
    .then(function(response) {
        alert('카카오 로그인 성공');
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

export default Ka_loginpage;