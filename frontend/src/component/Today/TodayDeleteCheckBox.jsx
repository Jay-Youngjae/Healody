import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 블러 효과 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 모달을 위한 레이어 */
`;

const TodayDeleteBox = styled.div`
  width: 260px;
  height: 160px;
  border-radius: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const TodayDeleteText = styled.h3`
  font-size: 22px;
  margin-bottom: 10px;
`;

const TodayDeleteButton = styled.button`
  cursor: pointer;
  background-color: black;
  color: white;
  border-radius: 13px;
  border: 0;
  margin-top: 15px;
  padding: 8px 16px;
`;

export default function TodayDeleteCheckBox({ content, buttonText, onDelete }) {
    const navigate = useNavigate();

    const handleDeleteButtonClick = () => {
        // 삭제 버튼 클릭 시 onDelete 함수 호출
        if (onDelete) {
            onDelete();
            navigate('/my_todayRecord')
        }
    };

    return (
        <ModalBackground>
            <TodayDeleteBox>
                <TodayDeleteText>{content}</TodayDeleteText>
                <TodayDeleteButton onClick={handleDeleteButtonClick}>{buttonText}</TodayDeleteButton>
            </TodayDeleteBox>
        </ModalBackground>
    );
}
