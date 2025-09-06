import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import TodayMoreBt from './TodayMoreBt';
import ProfileImg from './../../img/profileImg.svg';
import TodayPlusBt from './../../img/TodayPlusBt.svg';
import { useState } from 'react';
import axios from 'axios';
const ProfileBox = styled.div`
  background-color: #F5F5F5;
  border: 1px solid #B6B6B5;
  border-radius: 10px;
  padding: 10px 5px;
  box-sizing: border-box;
  margin-top: 20px;
  position: relative;
`

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid black;
  margin-left: 15px;
`

const ProfileTopWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ProfileTopRightWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ProfileInfoBigWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`

const ProfileInfoWrap = styled.div`
  display: flex;
  flex-direction: row;
`

const ProfileIntroInput = styled.input`
  color: silver;
  border: 1px solid #B6B6B5;
  border-radius: 20px;
  padding: 5px 10px;
  margin-left: 5px;
  width: 90%;
`

const ProfileAddBt = styled.img`
  cursor: pointer;
  margin: 0;
  position: absolute;
  top: 30px;
  right: 25px;
  transform: translate(50%, -50%);
`

const Name = styled.p`
  color: black;
  margin: 10px;
  font-size: 18px;
`

const Date = styled.p`
  color: #787878;
  margin: 15px 5px 0 5px;
  font-size: 13px;
`

const ProfileBottomWrap = styled.button``;

export default function TodayProfile({ content, link, moreLink, userName, userBirth, userImage, id }) {
    const [formData, setFormData] = useState({
      message: "",
    });

    const handleInputChange = (event) => {
      const {name, value} = event.target;
      setFormData({...formData, [name]: value});
    }

    const handleMessage = () => {
      const requestBody = {
        message: formData.message,
      };
      axios('https://healody.shop/api/user/message',{
          data:requestBody,
          method: 'PATCH',
      })
      .then(function(response) {
        alert('상태메세지가 변경되었습니다');
        console.log(response.data.data.message);
        const setmessage = response.data.data.message;
        localStorage.setItem('nowMessage',setmessage);
        // const nowMessage = localStorage.getItem('nowMessage');
      })
      .catch(function(error) {
        console.log(error.response.status);
      })
    }

    const nowMessage = localStorage.getItem('nowMessage');
    const navigate = useNavigate();
    const name = localStorage.getItem('name');
    const moveLink = link
    return (
        <ProfileBox>
            <ProfileAddBt src={TodayPlusBt} onClick={() => {
                navigate(moveLink,{
                    state : {
                        id: { id }
                    }
                } );
            }}/>
            <ProfileTopWrap>
                <ProfileTopRightWrap>
                    <ProfileImage src={userImage} />
                    <ProfileInfoBigWrap>
                        <ProfileInfoWrap>
                            <Name>{userName}</Name>
                            <p></p>
                            <Date>{userBirth}</Date>
                        </ProfileInfoWrap>
                        <ProfileIntroInput 
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange} 
                            placeholder="상태메시지를 입력하세요" 
                        />
                        {/* {nowMessage}
                        <button onClick={handleMessage}>확인</button> */}
                    </ProfileInfoBigWrap>
                </ProfileTopRightWrap>
            </ProfileTopWrap>
            <TodayMoreBt content={content} link={moreLink} id={id}/>
        </ProfileBox>
    );
}
