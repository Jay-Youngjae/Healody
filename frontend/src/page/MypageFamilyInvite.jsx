import React, { useState } from "react";
import { Header } from "../component/Header";
import Search from "../img/Search.png";
import axios from 'axios';

const styles = {
    header: {
        backgroundColor: "transparent",
        left: 0,
        position: "absolute",
        top: "42px"

    },

    healodyLogo: {
        height: "38px",
        position: "relative",
        width: "98px"
    },

    input: {
        display: "flex",
        width: "290px",
        height: "34px",
        textAlign: "center",
        fontSize: "13px",
        border: "none"
    },

    input2: {
        display: "flex",
        width: "290px",
        height: "34px",
        color: "#60605F",
        textAlign: "center",
        fontSize: "13px",
        fontWeight: "500",
        marginLeft: "50px",
        marginTop: "7px",
        border: "none"
    },

    input_box: {
        display: "flex",
        border: "0.5px solid #B6B6B5",
        backgroundColor: "#fff",
        gap: "10px",
        alignItems: "center",
        width: "328px",
        padding: "8px 15px",
        borderRadius: "20px",
        marginTop: "70px",
        marginLeft: "12px",
        marginRight: "20px"

    },

    input_box2: {
        display: "flex",
        border: "0.5px solid #B6B6B5",
        backgroundColor: "#fff",
        gap: "10px",
        alignItems: "center",
        width: "328px",
        height: "33px",
        padding: "5px 12px",
        borderRadius: "10px",
        marginTop: "8px",
        marginLeft: "12px",
        marginRight: "20px"
    },

    img: {
    },

    box: {
        marginLeft: "10px",
    },

}


function MypageFamilyInvite() {
    const host = 'http://15.165.115.39:8080';
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const [phone, setPhone] = useState('')
    const [namesList, setNamesList] = useState([]);

    const handleInputChange = (event) => {
        setPhone(event.target.value);
    }

    const sendPostRequest = async () => {
        axios({
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: {
                'userPhone': phone,
                'homeId': '1'
            }
        }).then(function(response){
            console.log(response);
        }).catch(function(error){

        });
    }

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            console.log('enter');
            sendPostRequest();
        }
    };

    // const onSubmitName = (e) => {
    //     e.preventDefault();
    //     if (name.trim() !== "") {
    //         setNamesList([...namesList, name]);
    //         setName("");
    //     }
    // }

    return (
        <>
            <div style={styles.box}>
                <div style={styles.header}>
                    <Header />
                </div>

                <div style={styles.healodyLogo}>
                    <healodyLogo/>
                </div>

                <div style={styles.input_box}>
                    <img style={styles.img} src={Search} />
                    <input
                        type="text"
                        value={phone}
                        style={styles.input}
                        onChange={handleInputChange}
                        onKeyDown={handleEnterKey}
                        placeholder="가족의 전화번호를 입력하고 집에 초대해보세요"
                    />
                </div>

                {namesList.map((item, index) => (
                    <div key={index} style={styles.input_box2}>
                    <div style={styles.input2}>{item}</div>
                  </div>
                ))}
            </div>

        </>
    );
}

export default MypageFamilyInvite;