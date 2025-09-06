import React, { useState } from "react";
import Header from "../component/Today/TodayHeader";
import HealodyLogo from "../img/login_logo.png";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const styles = {

    header: {
        backgroundColor: "transparent"
    },

    bodyWrap: {
        height: 'calc(100vh - 250px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    healodyLogo: {
        margin: '0 auto',
    },

    img: {
        width: '200px'
    },

    input: {
        display: "flex",
        width: '100%',
        height: "30px",
        textAlign: "center",
        fontSize: "13px",
        border: "none",
    },
    
    input_box: {
        border: "0.5px solid #000000",
        textAlign: "center",
        padding: "5px",
        borderRadius: "10px",
        marginTop: '30px',
        width: '80%',
    },

    input_box2: {
        display: 'flex',
        justifyContent: 'center'
    },

    p: {
        fontStyle: "normal",
        border: "0.5px solid #000000",
        backgroundColor: "#6F02DB",
        fontWeight: 600,
        lineHeight: "40px",
        width: '80%',
        margin: '0 auto',
        color: 'white',
        borderRadius: '10px',
        cursor: 'pointer'
    },
}


function MypagePassword() {
    const [pw, setPw] = useState('')
    const [formData, setFormData] = useState({
        password: "",
    })

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    }

    const handlePassword = async () => {
        const requestBody = {
            password: formData.password,
        };
        
        try {
            const response = await axios.post('https://healody.shop/api/user/password/check', requestBody, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            const { result, message } = response.data;
    
            if (result === 'SUCCESS') {
                alert(message);
                navigate('/Mypage_MemberInformation'); // 비밀번호가 일치하면 마이페이지로 이동
            } else if (result === 'FAILURE') {
                alert(message); // 비밀번호가 일치하지 않을 때 서버에서 보내는 메시지 출력
            }
        } catch (error) {
            console.error('비밀번호 확인 요청 에러:', error);
        }
    }

    const navigate = useNavigate();
    
    return (
        <>
            <div style={styles.box}>
                <div style={styles.header}>
                    <Header />
                </div>

                <div style={styles.bodyWrap}>
                    <div style={styles.healodyLogo}>
                        <img style={styles.img} src={HealodyLogo} />
                    </div>

                    <div style={styles.input_box}>
                        <input
                            name="password"
                            type="text"
                            value={formData.password}
                            style={styles.input}
                            onChange={handleInputChange}
                            placeholder="비밀번호 입력"
                        />
                    </div>
                </div>

                <div style={styles.input_box2} onClick={handlePassword}>
                    <button style={styles.p}>확인</button>
                </div>

            </div>
        </>
    );
}

export default MypagePassword;