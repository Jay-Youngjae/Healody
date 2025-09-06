import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import BackIcon from "../img/back_icon.png";
import nextFalse from "../img/next_false.png";
import nextTrue from "../img/Next_true.png";
import axios from 'axios';
import LoginModal from "../component/LoginModal";


const styles={
    input: {
        border: "none",
        width: 320,
        height: 40,
        marginTop: "10px",
        },
        input_box: {
            border: "1px solid #D9D9D9",
            height: 70,
            width: 328,
            textAlign: "center",
            padding: "5px",
            borderRadius: "10px",
            marginTop: "10px"
            
        },
    p: {
        float: "left",
        marginLeft: "10px",
        height: 5,
        marginTop: "-2px",
        color: "#D9D9D9",
        fontSize: "7px",
        paddingBottom: "2px",
    },
    img: {
        
        marginTop: "10px",
        marginLeft: "-10px",
    },
    title: {
        fontWeight: "bold",
        fontSize: "20px",
    },
    box: {
        marginLeft: "10px",
    },
    
    logbox: {
        textAlign: "center",
        position: "fixed",
        bottom: "10px",
        right: "20px",
    },
    list: {
        display: "flex",
        listStyle: "none",
        padding: 0,
        fontSize: "14px",
        
    },
    inList: {
        marginLeft: "10px",
    },
    inList1: {
        marginLeft: "10px",
        color: "#CDCDCC",
    },
    listbox: {
        position: "fixed",
        bottom: "65px",
        right: "55px",
    },
    false: {
        marginTop: "20px",
    },
    true: {
        marginTop: "20px",
        cursor: 'pointer',
    },
}

// const [name, setName] = useState('')
// const [nameMessage, setNameMessage] = useState('')
// const [isName, setIsName] = useState(false)

// const onSubmitName = (e) => {
//     setName(e.target.value);
//     if (e.target.value.length < 2 || e.target.value.length > 5) {
//       setNameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
//       setIsName(false);
//     } else {
//       setNameMessage('올바른 이름 형식입니다 :)');
//       setIsName(true);
//     }
//   }; 

  
function LoginPage() {

    const navigate = useNavigate();
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const [formData, setFormData] = useState({
        phone: "",
        password: "",
    });
    const [showImage, setShowImage] = useState(true);
    const [indexCount, setIndexCount] = useState(0);
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
        const count = event.target.value.length;
        console.log(count);
        if( count > 0 && showImage == true) {
            setShowImage(!showImage);
        }
        else if( count == 0 && showImage == false) {
            setShowImage(!showImage);
              }
        // const word = event.target.value.split(' ');
        // const totalIndex = word.reduce((acc, words) => {
        //     return acc + words.length;
        // }, 0);
        // if(indexCount != 0 && showImage == true){
        //     setShowImage(!showImage);
        // }
        // else if(indexCount == 0 ){
        //     setShowImage(showImage);
        // }

        // setIndexCount(totalIndex -1);
        
        // console.log(showImage);
        // console.log(totalIndex);

        // const word = formData.phone;console.log(word.length)
        // if( word != "" && showImage == true) {
        //     setShowImage(!showImage);
        // }
        // else if( word == "" && showImage == false) {
        //     setShowImage(!showImage);
        // }
        // console.log(showImage);
        
    }

    const handleLogin = () => {
        const requestBody = {
            phone: formData.phone,
            password : formData.password,
        };
        axios('https://healody.shop/api/auth/login',{
                data: requestBody,
                method: 'POST',
            })
            .then(function(response) {
                alert('로그인 되었습니다.')
                const token = response.data.token;
            
                localStorage.setItem('token', token);
                
                console.log(response.data.userId);
                const userId = response.data.userId;
                localStorage.setItem('userId', userId);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                navigate('/my_today');
            })
            .catch(function(error) {
                console.log(error.response.status);
                if(error.response.status == 401) {
                    return(
                    <>
                     <LoginModal message="This is Modal" />
                     </>
                    )
                }
            })
        axios('https://healody.shop/api/user', {
            method: 'GET',
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error.response.status);
        })
    }

    

    // const onSubmitId = (e) => {
    //     setId(e.target.value);
    // }

    // const onSubmitPw = (e) => {
    //     setPw(e.target.value);
    // }



    return (
        <>
            <div style={styles.box}>
            <img  style={styles.img} src={BackIcon} />
            <p style={styles.title}>로그인</p>
            
            <div style={styles.input_box}>
                <p style={styles.p}>아이디</p>
                <input
                    name="phone"
                    type="text"
                    value={formData.phone}
                    style={styles.input}
                    onChange={handleInputChange}
                    placeholder="전화번호(- 빼고 번호만 입력)를 입력해주세요"
                /> 
            </div>
            

            <br />
            <div style={styles.input_box}>
                <p style={styles.p}>비밀번호</p>
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
            <div style={styles.listbox}>
                {/* <ul style={styles.list}>
                    <li style={styles.inList}>
                        아이디 찾기
                    </li>
                    <li style={styles.inList1}>
                        |
                    </li>
                    <li style={styles.inList}>
                        비밀번호 찾기
                    </li>
                    <li style={styles.inList1}>
                        |
                    </li>
                    <li style={styles.inList}>
                        회원가입
                    </li>
                </ul> */}
            </div>
            <div style={styles.logbox}>
            <div>
            {showImage ? (
                <img
                src={nextFalse}
                style={styles.false}
                alt="false"
                />
            ) : (
                <img
                src={nextTrue}
                style={styles.true}
                alt="true"
                onClick={handleLogin}
                />
            )}
            </div>
            </div>
        </>
    );
}

export default LoginPage;