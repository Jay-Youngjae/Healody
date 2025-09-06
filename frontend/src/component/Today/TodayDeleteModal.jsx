import React from 'react';
import styled from 'styled-components';

const ModalBox = styled.div`
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
  position: absolute; /* Use relative positioning */
  top: 35px; /* Adjust the top value to create a separation between the button and the modal box */
  right: 10px;
`;

export default function TodayDeleteModal({ isOpen }) {
    if (!isOpen) return null;
    return <ModalBox>삭제하기</ModalBox>;
}