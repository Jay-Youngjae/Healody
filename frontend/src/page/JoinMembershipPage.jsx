import React, { useState } from 'react';
import BackIcon from "../img/back_icon.png";
import nextFalse from "../img/next_false.png";
import nextTrue from "../img/Next_true.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/button.css';

const styles= {
    input: {
        border: "none",
        width: 320,
        height: 40,
        marginTop: "10px",
        display: "flex",
        },
    input_box: {
        border: "1px solid #D9D9D9",
        height: 70,
        width: 328,
        textAlign: "center",
        padding: "5px",
        borderRadius: "10px",
        marginTop: "10px",
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
    under: {
        color: "#D9D9D9",
        fontSize: "5px",
        marginLeft: "10px",
    },
    box: {
        margin: "0 auto",
        position: "relative",
        marginLeft: "20px",
    },
    title: {
        fontWeight: "bold",
        fontSize: "20px",
    },
    img: {
        
        marginTop: "10px",
        marginLeft: "-10px",
    },
    false: {
        marginTop: "20px",
    },
    true: {
        marginTop: "20px",
        cursor: 'pointer',
    }
}
// const InputBox = (props) => {
//   const [inputValue, setInputValue] = useState('');
//   const handleChange = (event) => {
//     setInputValue(event.target.value);
//   };

const JoinMembershipPage = () => {

    const navigate = useNavigate();
    const [name1, setName1] = useState('')
    const [id, setId] = useState('')
    const [email1, setEmail1] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [number, setNumber] = useState('')

    const [nameMessage, setNameMessage] = useState('')
    const [idMessage, setIdMessage] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')

    const [isName, setIsName] = useState(false)
    const [isId, setIsId] = useState(false)
    const [isEmail, setIsEmail] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)

    const result = localStorage.getItem('result');

    const [showImage, setShowImage] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        birth: "",
        email: "",
        gender: "",
        password: "",
        nickname: "",
        confirm: "",
        phone: "",
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({ ...formData, [name]: value});

    }

    //이메일 중복체크
    const handleSaveEmail = () => {
        const requestBodyemail = {
            email : formData.email
        };
        axios(`https://healody.shop/api/auth/email/${requestBodyemail.email}/exists`,{
            method: 'GET',
            })
            .then(function(response) {
                alert("이메일 중복체크가 되었습니다")
            })
            .catch(function(error) {
                console.log(error);
            })
        }

    //이메일 인증번호 발송
    const handlecertifyEmail = () => {
        const requestBodyemail = {
            email : formData.email,
        };

        axios(`https://healody.shop/api/auth/email-confirm?email=${requestBodyemail.email}`,{
            method: 'POST',
            })
            .then(function(response) {
                alert("인증번호가 발송되었습니다");
            }) 
            .catch(function(error) {
                console.log(error);
            })
        }


    //이메일 인증번호 확인
    const handleconfirmEmail = () => {
        const requestBodyConfirm = {
            confirm : formData.confirm,
        };
        axios(`https://healody.shop/api/auth/email-confirm/check?check=${requestBodyConfirm.confirm}`,{
            method: 'POST',
            })
            .then(function(response) {
                alert('인증번호가 확인이되었습니다')
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    const handleSaveNickname = () => {
        var nickname =new String(formData.nickname);

        const requestBodynickname = {
            nickname : nickname
        };
        console.log(nickname);
        axios('https://healody.shop/api/auth/nickname/'+requestBodynickname.nickname+'/exists',{
            method: 'GET',
            // data: requestBodynickname,
            })
            .then(function(response) {
                alert("닉네임 중복 체크가 되셨습니다.");
                if(response.data.result == 'SUCCESS'){
                    alert('다음 버튼을 눌러주세요')
                    setShowImage(!showImage);
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }



    const handleSave = () => {
        const requestBody = {
                name : formData.name,
                birth : formData.birth,
                email : formData.email,
                gender : formData.gender,
                password : formData.password,
                nickname : formData.nickname,
                confirm : formData.confirm,
                phone: formData.phone
        };
        axios('https://healody.shop/api/auth/join',{
                data: requestBody,
                method: 'POST',
            })
            .then(function(response) {
                if(response.data.result == 'SUCCESS') {
                    alert('회원가입이 되셨습니다');
                    navigate('/login_page');
                    localStorage.setItem('name',formData.name);
                    localStorage.setItem('birth',formData.birth);
                    localStorage.setItem('email',formData.email);
                    localStorage.setItem('gender',formData.gender);
                    localStorage.setItem('password',formData.password);
                    localStorage.setItem('nickname',formData.nickname);
                    localStorage.setItem('phone',formData.phone);
                }
                else {
                    alert('다시 정보를 올바르게 입력해주세요');
                }
            })
            .catch(function(error) {
                console.log(error.response.status);
            })
       
    }

    const onSubmitName = (e) => {
        setName1(e.target.value1);
        if (e.target.value1.length < 1 || e.target.value1.length > 10) {
          setNameMessage('한글 혹은 영문을 포함하여 1~10자로 입력하세요.');
          setIsName(false);
        } else {
          setNameMessage('올바른 이름 형식입니다 :)');
          setIsName(true);
        }
      }; 

      const onSubmitId = (e) => {
        setId(e.target.value);
        const idRegex = /^(?=.*[a-z])(?=.*[0-9]).{6,12}$/;

        const idCurrent = e.target.value;
        setId(idCurrent);
        
        if(!idRegex.test(idCurrent)) {
            setIdMessage('영소문자, 숫자를 조합하여 6~12자를 입력하세요.');
            setIsId(false);
        } else {
            setIdMessage('올바른 형식이에요!');
            setIsId(true);
        }
      };

      const onSubmitEmail = (e) => {
        const [name, value] = e.target;
        setFormData({ ...formData, [name]: value});
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        
        const emailCurrent = e.target.value;
        setEmail1(emailCurrent);

        if(!emailRegex.test(emailCurrent)) {
            setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해줘요');
            setIsEmail(false);
        }else {
            setEmailMessage('올바른 이메일 형식이에요');
            setIsEmail(true);
        }
        };

        const onSubmitPassword = (e) => {
            const passwordRegex = 
                /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
            const passwordCurrent = e.target.value;
            setPassword(passwordCurrent);

            if(!passwordRegex.test(passwordCurrent)) {
               setPasswordMessage('숫자+영문자+특수문자 조합으로 8~16자리로 입력해주세요!');
                setIsPassword(false);
            } else {
                setPasswordMessage('안전한 비밀번호에요!');
                setIsPassword(true);
            }
        };

        const onSubmitPasswordConfirm = (e) => {
            const passwordConfirmCurrent = e.target.value;
            setPasswordConfirm(passwordConfirmCurrent);
    
            if(password == passwordConfirmCurrent) {
                setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요')
                setIsPasswordConfirm(true)
            } else{
                setPasswordConfirmMessage('비밀번호가 틀려요 다시 입력해주세요')
                setIsPasswordConfirm(false)
            }
          };

        const onSubmitCertified = (e) => {
            setNumber(e.target.value);
        }

        const handlecertifyPhone = () => {
             const requestBodyPhone = {
                phone : formData.phone
            };
            
            axios(`https://healody.shop/api/auth/phone/${requestBodyPhone.phone}/exists`,{
                method: 'GET',
                })
                .then(function(response) {
                    alert("핸드폰 중복체크가 완료되었습니다")

                })
                .catch(function(error) {
                    console.log(error);
                })
        }

        
  return (
    <>
    <div style={styles.box}>
        <img style={styles.img} src={BackIcon} />
        <p style={styles.title}>회원가입</p>
        <br />
        <div>
            <div style={styles.input_box}>
            <p style={styles.p}>이름</p>
            <input
                name="name"
                value={formData.name}
                type="text"
                style={styles.input}
                onChange={handleInputChange}
                placeholder="이름을 입력해주세요"
            />
            </div>
            {/* <p style={styles.under}>{nameMessage}</p> */}
        </div>

        <div>
            <div style={styles.input_box}>
            <p style={styles.p}>생일</p>
            <input
                name="birth"
                value={formData.birth}
                type="text"
                style={styles.input}
                onChange={handleInputChange}
                placeholder="생일을 입력해주세요(ex. 2000-05-21)"
            />
            </div>
            {/* <p style={styles.under}>{nameMessage}</p> */}
        </div>

        <div>
            <div style={styles.input_box}>
            <p style={styles.p}>이메일</p>
            <input
                type="text"
                name="email"
                value={formData.email}
                style={styles.input}
                onChange={handleInputChange}
                placeholder="이메일을 입력해주세요"
            />
            </div>
            <p style={styles.under}>{emailMessage}</p>
        
        </div>
        <div class="frame">
                <button class="custom-btn btn-3" onClick={handleSaveEmail}><span>이메일 중복체크 버튼</span></button>
                <br />
                <button class="custom-btn btn-3" onClick={handlecertifyEmail}><span>이메일 인증번호 발송 버튼</span></button>
        </div>

        <div>
            <div style={styles.input_box}>
            <p style={styles.p}>인증번호</p>
            <input
                type="text"
                name="confirm"
                value={formData.confirm}
                style={styles.input}
                onChange={handleInputChange}
                placeholder="인증번호를 입력해주세요"
            />
            </div>
            <div class="frame">
                <button class="custom-btn btn-3" onClick={handleconfirmEmail}><span>인증번호 확인 버튼</span></button>
            </div>
        </div>

        <div>
            <div style={styles.input_box}>
            <p style={styles.p}>전화번호</p>
            <input
                type="text"
                name="phone"
                value={formData.phone}
                style={styles.input}
                onChange={handleInputChange}
                placeholder="전화번호를 입력해주세요"
            />
            </div>
            <div class="frame">
                <buton class="custom-btn btn-3" onClick={handlecertifyPhone}><span>전화번호 중복체크</span></buton>
            </div>
        </div>

        <div>
            <div style={styles.input_box}>
            <p style={styles.p}>성별</p>
            <input
                type="text"
                name="gender"
                value={formData.gender}
                style={styles.input}
                onChange={handleInputChange}
                placeholder="성별을 입력해주세요"
            />
            {/* <button onClick={handleSaveEmail}>눌러</button> */}
            </div>
            {/* <p style={styles.under}>{emailMessage}</p> */}
        </div>

        <div>
            <div style={styles.input_box}>
            <p style={styles.p}>비밀번호</p>
            <input
                type="text"
                name= "password"
                value={formData.password}
                style={styles.input}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력해주세요"
            />
            
            </div>
            {/* <p style={styles.under}>{passwordMessage}</p> */}
        </div>

        <div>
            <div style={styles.input_box}>
            <p style={styles.p}>비밀번호 확인</p>
            <input
                type="text"
                value={passwordConfirm}
                style={styles.input}
                onChange={onSubmitPasswordConfirm}
                placeholder="비밀번호를 다시 입력해주세요"
            />
            
            </div>
            {/* <p style={styles.under}>{passwordConfirmMessage}</p> */}
        </div>




        <div>
            <div style={styles.input_box}>
            <p style={styles.p}>닉네임</p>
            <input
                name="nickname"
                value={formData.nickname}
                value1={name1}
                type="text"
                style={styles.input}
                onChange={handleInputChange}
                placeholder="닉네임을 입력해주세요"
            />
            
            </div>
            <div class="frame">
                <button class="custom-btn btn-3" onClick={handleSaveNickname}><span>닉네임 중복체크</span></button>
            </div>
            <p style={styles.under}>{nameMessage}</p>
        </div>
        
        {/* <div>
            <div style={styles.input_box}>
            <p style={styles.p}>생년월일</p>
            <input
                type="text"
                value={id}
                style={styles.input}
                onChange={onSubmitId}
                placeholder="아이디를 입력해주세요"
            />
            
            </div>
            <p style={styles.under}>{idMessage}</p>
        </div> */}


        {/* <div>
            <div style={styles.input_box}>
            <p style={styles.p}>비밀번호</p>
            <input
                type="text"
                value={password}
                style={styles.input}
                onChange={onSubmitPassword}
                placeholder="비밀번호를 입력해주세요"
            />
            
            </div>
            <p style={styles.under}>{passwordMessage}</p>
        </div> */}

        {/* <div>
            <div style={styles.input_box}>
            <p style={styles.p}>비밀번호 확인</p>
            <input
                type="text"
                value={passwordConfirm}
                style={styles.input}
                onChange={onSubmitPasswordConfirm}
                placeholder="비밀번호를 다시 입력해주세요"
            />
            
            </div>
            <p style={styles.under}>{passwordConfirmMessage}</p>
        </div> */}

        {/* <div>
            <div style={styles.input_box}>
            <p style={styles.p}>이메일</p>
            <input
                type="text"
                name="email"
                value={formData.email}
                style={styles.input}
                onChange={handleInputChange}
                placeholder="이메일을 입력해주세요"
            />
            <button onClick={handleSaveEmail}>눌러</button>
            </div>
            <p style={styles.under}>{emailMessage}</p>
        </div> */}

        {/* <div>
            <div style={styles.input_box}>
            <p style={styles.p}>인증번호</p>
            <input
                type="text"
                value={number}
                style={styles.input}
                onChange={onSubmitCertified}
                placeholder="인증번호 6자리 입력"
            />
            
            </div>
        </div> */}
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
          onClick={handleSave}
        />
      )}
    </div>
        
    </div>

    </>
  );
};

export default JoinMembershipPage;
