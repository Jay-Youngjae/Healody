import React, { useState } from 'react';
import styled from 'styled-components';
import check from './../../img/CheckhospitalCheck.svg';
import checked from './../../img/CircleCheckedIcon.svg';

const Button = styled.div`
  background-color: white;
  color: white;
  border-radius: 15px;
  border: 0.5px solid #B6B6B5;
  height: 26px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${props => props.width}px;
  cursor: pointer;
`

const ButtonImg = styled.img`
  width: 13px;
  height: 13px;
`

const ButtonTitle = styled.p`
  margin-left: 3px;
  color: #414140;
  font-size: 12px;
`

const TodayRecordTypeButton = ({ content, width, selectedValue, onClick }) => {

    const isActive = selectedValue === content;

    const handleItemClick = () => {
        onClick(content);
    };

    return (
        <Button width={width} onClick={handleItemClick}>
            {isActive ? <ButtonImg src={checked} /> : <ButtonImg src={check} />}
            <ButtonTitle>{content}</ButtonTitle>
        </Button>
    )
}

export default TodayRecordTypeButton;