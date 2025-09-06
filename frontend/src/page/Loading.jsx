import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Email from './../component/Email';

function Loading() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(code);
    // const id = localStorage.setItem('')
    const code1 = code.toString();
    const navigate = useNavigate();
    console.log(window.location.href);
    // let ingacode = new URL(window.location.href).searchParams.get('code');
    // console.log(ingacode);
    // let kakaoUrl = new URL(window.location.href);
    // console.log(kakaoUrl);
    // const ingastr = ingacode.toString();
    axios(`https://healody.shop/api/auth/kakao/callback2?code=${code1}`, {
        method: "GET",
    })
        .then(function (response) {
            alert("카카오로그인이 되셨습니다.");
            console.log(response);
            console.log(response.data.status);
            if(response.data.status == false) {
                localStorage.setItem('email',response.data.email);
                navigate('/add_info');
            }
            else if(response.data.status == true) {
                localStorage.setItem('phone',response.data.phone);
                navigate('/ka_login');
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log("에러남");
        });

    return <></>;
}

export default Loading;

// const Loading = (props) => {
//     const navigate = useNavigate();
//     const code = new URL(window.location.href).searchParams.get("code");

//     useEffect(() => {
//         const kakao = async () => {
//             await axios({
//                 method: "GET",
//                 url: `http://localhost:3000/loading/?code=${code}`,
//                 headers: {
//                     "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
//                     "Access-Control-Allow-Origin": "*",
//                   },
//             }).then((res) => {
//                 console.log(res);
//                 localStorage.setItem("name", res.data.account.kakaoName);
//                 navigate("/my_today");
//             });
//         };
//         kakao();
//     }, [props.history]);
//     return(
//         <div>
//             로그인중 기다려ㅕ봐
//         </div>
//     )
// }

// export default Loading;
