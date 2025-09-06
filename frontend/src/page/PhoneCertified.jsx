import React, { useState } from "react";
import BackIcon from "../img/back_icon.png";
import LoginFalse from "../img/login_false.png";
import Dropdown from './../component/Dropdown';

const styles={
    input: {
        border: "none",
        width: 320,
        height: 40,
        },
    input_box: {
        border: "1px solid #D9D9D9",
        height: 60,
        width: 328,
        textAlign: "center",
        padding: "5px",
        borderRadius: "10px",
        
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
    abt: {
        display: "flex",
        float: "right",
        marginTop: "-20px",
    }
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

  
function PhoneCertified() {

    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const [selectedOption, setSelectedOption] = useState('SKT');
    const [isDropdownView, setDropdownView] = useState(false);

    

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const onSubmitId = (e) => {
        setId(e.target.value);
    }

    const onSubmitPw = (e) => {
        setPw(e.target.value);
    }

    const handleClickContainer = () => {
        setDropdownView(!isDropdownView)
    }

    const handleBlurContainer = () => {
        setTimeout(() => {
            setDropdownView(false)
        }, 200);
    }

    return (
        <>
            <div style={styles.box}>
            <img  style={styles.img} src={BackIcon} />
            <p style={styles.title}>휴대전화 인증</p>


            
                
            <div style={styles.input_box}>
                <p style={styles.p}>통신사</p>
                <select style={styles.input}>{selectedOption}
                    <option value="SKT">SKT</option>
                    <option value="LG U+">LG U+</option>
                    <option value="KT">KT</option>
                    <option value="알뜰폰">알뜰폰</option>
                </select>
            </div>
               
                
                {isDropdownView && <Dropdown /> }
           


            {/* <div style={styles.input_box}>
                <p style={styles.p}>통신사 선택</p>
                <button onClick={toggleDropdown}>
                <input
                    type="text"
                    value={id}
                    style={styles.input}
                    onChange={onSubmitId}
                    placeholder="이메일 (example@gamil.com)"
                    
                />
                </button>
                {isOpen && (
                    <ul>
                        <li onClick={() => handleItemClick('SKT')}>SKT</li>
                        <li onClick={() => handleItemClick('LG U+')}>LG U+</li>
                        <li onClick={() => handleItemClick('KT')}>KT</li>
                        <li onClick={() => handleItemClick('알뜰폰')}>알뜰폰</li>
                    </ul>
                )}
            </div> */}
            

            <br />

            <div style={styles.input_box}>
                <p style={styles.p}>전화번호</p>
                <input
                    type="text"
                    value={pw}
                    style={styles.input}
                    onChange={onSubmitPw}
                    placeholder="전화번호를 입력해주세요"
                />
                <button style={styles.abt}>인증</button>
            </div>


            </div>
            <div style={styles.listbox}>
                <ul style={styles.list}>
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
                </ul>
            </div>
            <div style={styles.logbox}>
                <img src={LoginFalse} />
            </div>
        </>
    );
}

export default PhoneCertified;