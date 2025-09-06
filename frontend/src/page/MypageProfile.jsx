import React, { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import profile from '../img/addProfileImg.svg';
import axios from 'axios';
import Header from "../component/Today/TodayHeader";

const Container = styled.div`
  width: 360px;
  margin: 0 auto;
  z-index: 2;
  height: calc(100vh);
  box-sizing: border-box;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.5em;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 150px);
  justify-content: center;
`

const ProfileTitle = styled.h1`
  font-size: 19px;
  margin: 10px 0 10px 15px;
  font-weight: bolder;
`

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImg = styled.img`
  
`

const FileInput = styled.input`
  margin: 5px 0 5px 10px;
`

const ProfileNameInput = styled.input`
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  width: 90%;
  margin-top: 15px;
`

const EditWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const EditButton = styled.button`
  border-radius: 10px;
  border: 0;
  background-color: #6F02DB;
  color: white;
  padding: 5px 0;
  cursor: pointer;
  width: 90%;
`

export default function MypageProfile() {
    const host = 'https://healody.shop';
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const onSubmitName = (e) => {
        setName(e.target.value);
    }

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

    const editInfo= (event) => {
        event.preventDefault();
        console.log(image);

        if (image) {
            const data = new FormData();

            data.append('image', image);

            const request = {
                'nickname': name
            };

            const requestDataBlob = new Blob([JSON.stringify(request)], { type: 'application/json' });
            data.append('request', requestDataBlob);

            // console.log('보내는데이터:' + data)
            axios.patch(host + '/api/user/profile', data, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(function (response) {
                alert('회원 정보가 변경되었습니다.');
                navigate('/my_today')
            })
        }
    }

    return (
        <Container>
            <Header />
            <Body>
                <ProfileTitle>프로필 편집</ProfileTitle>
                <ProfileWrap>
                    <ProfileImg src={profile} />
                    <FileInput type="file" accept="image/*" onChange={handleImageChange} />
                    <ProfileNameInput
                        type="text"
                        placeholder="닉네임을 입력하세요"
                        value={name}
                        onChange={onSubmitName}
                    />
                </ProfileWrap>
            </Body>
            <EditWrap>
                <EditButton onClick={editInfo}>수정하기</EditButton>
            </EditWrap>
        </Container>
    );
}
