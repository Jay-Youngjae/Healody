// TodayListButton.js
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  width: 310px;
  border-radius: 15px;
  border: 1px solid #B6B6B5;
  background-color: white;
  height: 35px;
  margin: 5px auto;
  color: ${props => (props.isActive ? '#000' : '#B6B6B5')};
`

const TodayListButton = ({ content, isActive, onClick }) => {
    return (
        <Button isActive={isActive} onClick={onClick}>
            {content}
        </Button>
    );
};

export default TodayListButton;
