import React from 'react';
import styled from 'styled-components';
import threedot from '../img/threeDot.svg';

const FamilyBoxWrap = styled.div`
  background-color: #F5F5F5;
  border: 1px solid #B6B6B5;
  border-radius: 10px;
  padding: 10px 5px;
  box-sizing: border-box;
  margin-top: 20px;
  display: flex;
`

const FamilyRightWrap = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`

const FamilyIntroWrap = styled.div`
  display: flex;
  justify-content: space-between;
`

const FamilyImage = styled.img``
const FamilyNameWrap = styled.div`
  display: flex;
`


const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid black;
  margin-left: 15px;
`

const FamilyName = styled.h3`
  font-weight: bolder;
  margin: 0 10px;
  font-size: 15px;
`

const FamilyNickName = styled.div``


const FamilyIntroInput = styled.input`
  color: silver;
  border: 1px solid #B6B6B5;
  border-radius: 20px;
  padding: 5px 10px;
  margin-left: 5px;
  width: 90%;
`

export default function FamilyBox({image, name, nickname, onClick}){

    return(
        <FamilyBoxWrap onClick={onClick}>
            <ProfileImage src={image} />
            <FamilyRightWrap>
                <FamilyIntroWrap>
                    <FamilyNameWrap>
                        <FamilyName>{name}</FamilyName>
                        <FamilyNickName>{nickname}</FamilyNickName>
                    </FamilyNameWrap>
                </FamilyIntroWrap>
                <FamilyIntroInput
                    name="message"
                    placeholder="상태메시지를 입력하세요"
                />
            </FamilyRightWrap>
        </FamilyBoxWrap>
    )
}