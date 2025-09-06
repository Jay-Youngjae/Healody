import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../component/Today/TodayHeader';

const Container = styled.div`
  width: 360px;
  margin: 0 auto;
  position: relative;
`

const EditInfoBox = styled.div`
  width: 100%;
  padding: 10px;
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const EditTitle = styled.h3`
  font-size: 20px;
  font-weight: bolder;
  margin: 10px;
`

const EditInput = styled.input`
  border: 1px solid black;
  border-radius: 15px;
  padding: 10px 5px;
  margin: 10px 10px 0 10px;
`

const EditCompleteBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
  //align-items: flex-end;
`

const EditButton = styled.button`
  border-radius: 10px;
  border: 0;
  background-color: #6F02DB;
  color: white;
  padding: 5px 0;
  cursor: pointer;
`

const WithdrawButton = styled.button`
  border-radius: 10px;
  border: 0.5px solid black;
  margin-top: 10px;
  background-color: #CDCDCC;
  color: white;
  padding: 5px 0;
  cursor: pointer;
`

const EditMessage = styled.p`
  font-size: 12px;
  color: silver;
  margin: 0 10px;
`

export default function MypageMemberInformation(){
    const host = 'https://healody.shop';
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [isEmail, setIsEmail] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')
    const [isPassword, setIsPassword] = useState(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)

    const onSubmitEmail = (e) => {
        const emailRegex =
            /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
        const emailCurrnet = e.target.value;
        setEmail(emailCurrnet);

        if (!emailRegex.test(emailCurrnet)) {
            setEmailMessage('올바르지 않은 이메일 형식입니다');
            setIsEmail(false);
        } else {
            setEmailMessage('올바른 이메일 형식입니다');
            setIsEmail(true);
        }
    };

    const onSubmitPassword = (e) => {
        const passwordRegex =
            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        const passwordCurrent = e.target.value;
        setPassword(passwordCurrent);

        if (!passwordRegex.test(passwordCurrent)) {
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

        if (password === passwordConfirmCurrent) {
            setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요')
            setIsPasswordConfirm(true)
        } else {
            setPasswordConfirmMessage('비밀번호가 틀려요 다시 입력해주세요')
            setIsPasswordConfirm(false)
        }
    };


    const editInfo = (e) => {
        const requestBody = {
            'email' : email,
            'password' : password
        }
        axios({
            url: host + '/api/user/info',
            method: 'PATCH',
            headers: {
                'Authorization':  'Bearer ' + token,
            },
            data: requestBody
        }).then(function(response){
            alert(response.data.message)
            navigate('/my_today')
            console.log(response.data)
        })
    }

    function withDrawInfo(){

    }


    return(
        <Container>
            <Header />
            <EditInfoBox>
                <EditTitle>회원정보수정</EditTitle>
                <EditInput
                    type="text"
                    value={email}
                    onChange={onSubmitEmail}
                    placeholder="이메일을 입력하세요" />
                <EditMessage>{ emailMessage }</EditMessage>
                <EditTitle>비밀번호 재설정하기</EditTitle>
                <EditInput
                    type="password"
                    value={password}
                    onChange={onSubmitPassword}
                    placeholder="비밀번호 재설정" />
                <EditMessage>{ passwordMessage }</EditMessage>
                <EditInput
                    type="password"
                    value={passwordConfirm}
                    onChange={onSubmitPasswordConfirm}
                    placeholder="비밀번호 확인" />
                <EditMessage>{ passwordConfirmMessage }</EditMessage>
            </EditInfoBox>
            <EditCompleteBox>
                <EditButton onClick={editInfo}>수정하기</EditButton>
                <WithdrawButton onClick={withDrawInfo}>탈퇴하기</WithdrawButton>
            </EditCompleteBox>
        </Container>
    )

}