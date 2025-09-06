import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from "../component/Today/TodayHeader";
import { useNavigate } from 'react-router-dom';
import profile from '../img/profile_layout_img.svg';

const Container = styled.div`
  width: 360px;
  margin: 0 auto;
  position: relative;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 15px;
`

const LayoutBox = styled.div`
  border: 1.2px solid black;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
`

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
`

const ProfileTopWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`

const ProfileImg = styled.img`
    margin-right: 10px;
    width: 60px;
    height: 60px;
    border: 1px solid black;
    border-radius: 50%;
`

const ProfileInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
`

const ProfileName = styled.h2`
  font-size: 17px;
  font-weight: bolder;
`

const ProfileEmail = styled.p`
`

const ProfileBt = styled.button`
  border: 0.5px solid black;
  width: 100%;
  font-weight: bolder;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 7px;
  padding: 5px 0;
  font-size: smaller;
`

const LayoutTitle = styled.h1`
  font-weight: 900;
  font-size: 18px;
  margin: 0 5px;
`

const LayoutLink = styled.p`
  cursor: pointer;
  margin: 10px 20px;
`

function MypageLayout() {
    const host = 'https://healody.shop';
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // 데이터 가져오는 로직 (예시)
        const fetchData = async () => {
            try {
                const response = await fetch(host + '/api/user', {
                    method: 'GET',
                    headers:{
                        'Authorization' : 'Bearer ' + token
                    },
                });
                const data = await response.json();
                setUserName(data.data.name);
                setUserEmail(data.data.email);
                setUserImage(data.data.image);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleProfileClick = () => {
        navigate('/Mypage_Profile');
    };

    const handleFamilyInviteClick = () => {
        navigate('/Mypage_FamilyInvite');
    };

    const handleFamilyManagementClick = () => {
        navigate('/Mypage_FamilyManagementMain');
    };

    const handlePasswordClick = () => {
        navigate('/Mypage_Password');
    };

    const logout = () => {
        alert('로그아웃 되었습니다.');
        localStorage.clear();
        navigate('/login_page');
    }

    return (
        <Container>
            <Header />
            <Body>
                <LayoutBox>
                    <ProfileWrap>
                        <ProfileTopWrap>
                            <ProfileImg src={userImage} />
                            <ProfileInfoWrap>
                                <ProfileName>{userName}</ProfileName>
                                <ProfileEmail>{userEmail}</ProfileEmail>
                            </ProfileInfoWrap>
                        </ProfileTopWrap>
                        <ProfileBt onClick={handleProfileClick}>프로필 편집</ProfileBt>
                    </ProfileWrap>
                </LayoutBox>
                <LayoutBox>
                    <LayoutTitle>계정</LayoutTitle>
                    <LayoutLink onClick={handlePasswordClick}>회원/개인 정보 관리</LayoutLink>
                </LayoutBox>
                <LayoutBox>
                    <LayoutTitle>내 가족</LayoutTitle>
                    <LayoutLink onClick={handleFamilyManagementClick}>내 가족 관리</LayoutLink>
                    <LayoutLink onClick={handleFamilyInviteClick}>가족 초대</LayoutLink>
                </LayoutBox>
                <LayoutBox>
                    <LayoutTitle>약관 및 정책</LayoutTitle>
                    <LayoutLink>서비스 이용 약관</LayoutLink>
                    <LayoutLink>개인정보 처리 방침</LayoutLink>
                </LayoutBox>
                <LayoutBox>
                    <LayoutTitle onClick={logout}>로그아웃</LayoutTitle>
                </LayoutBox>
            </Body>
        </Container>
    )
}

export default MypageLayout;