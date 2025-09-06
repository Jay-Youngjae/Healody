import React, { useState } from 'react';
import styled from 'styled-components';
import Delete from './../../img/threeDot.svg';
import TodayDeleteModal from "./TodayDeleteModal";

const TodayRecordBoxWrap = styled.div`
  position: relative; 
  border-radius: 10px;
  border: 1px solid #B6B6B5;
  background-color: #F5F5F5;
  padding: 15px 10px;
  margin-bottom: 10px;
`

const TodayRecordBoxTitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`

const TodayRecordBoxTitleSmallWrap = styled.div`
  display: flex;
  flex-direction: row;
`

const TodayRecordBoxTitle = styled.div`
  background-color: #6F02DB;
  border: 0;
  border-radius: 20px;
  color: white;
  padding: 2px 10px;
`

const TodayRecordBoxTime = styled.div`
  color: #787878;
  font-size: 13px;
  margin: 0 0 0 15px;
  padding-top: 3px;
`

const TodayRecordDelete = styled.img`
  cursor: pointer;
  position: relative;
`

const TodayRecordContent = styled.div`
  border-radius: 20px;
  border: 1px solid #B6B6B5;
  background-color: white;
  color: #414140;
  margin-top: 10px;
  padding: 5px 10px;
`
const TodayDeleteModalBox = styled.div`
  cursor: pointer;
  width: 110px;
  height: 35px;
  text-align: center;
  color: #EF4444;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 35px;
  right: 10px;
`;
export default function TodayRecordBox({ type, date, content, onOpenModal, onClick }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleThreedotClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleDeleteButtonClick = () => {
        setIsModalOpen(false); // 혹시 모달이 열려있다면 닫습니다.
        onOpenModal(); // "삭제하기" 버튼을 누르면 TodayDeleteCheckBox를 나타내는 콜백 함수를 호출합니다.
    };


    return (
        <TodayRecordBoxWrap>
            <TodayRecordBoxTitleWrap>
                <TodayRecordBoxTitleSmallWrap onClick={onClick}>
                    <TodayRecordBoxTitle>{type}</TodayRecordBoxTitle>
                    <TodayRecordBoxTime>{date}</TodayRecordBoxTime>
                </TodayRecordBoxTitleSmallWrap>
                <TodayRecordDelete src={Delete} onClick={handleThreedotClick} />
            </TodayRecordBoxTitleWrap>
            <TodayRecordContent>{ content }</TodayRecordContent>
            {isModalOpen && (
                <TodayDeleteModalBox onClick={handleDeleteButtonClick}>삭제하기</TodayDeleteModalBox>
            )}
        </TodayRecordBoxWrap>
    );
}
