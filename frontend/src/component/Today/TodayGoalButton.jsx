// TodayGoalButton.js
import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Button = styled.div`
  background-color: white;
  border: 1px solid #B6B6B5;
  padding: 10px 15px;
  border-radius: 15px;
  color: ${props => (props.isActive ? '#000' : '#B6B6B5')};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  cursor: pointer;
  margin-right: 10px;
  position: relative;

  /* Style for the input field inside the button */
  input {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 13px;
    color: #B6B6B5;
    padding: 0;
    margin: 0;
    width: ${props => (props.isInputVisible ? '100%' : 'auto')};
    max-width: ${props => (props.isInputVisible ? '100px' : 'none')};
    display: ${props => (props.isInputVisible ? 'block' : 'none')};
  }
`;

const TodayGoalButton = ({ content, isActive, onClick }) => {
    const [isInputVisible, setIsInputVisible] = useState(false);
    const inputRef = useRef(null);

    const handleButtonClick = () => {
        if (content === '직접입력') {
            setIsInputVisible(true);
        } else {
            setIsInputVisible(false); // 직접입력 창이 사라지도록 변경
            onClick(content);
        }
    };

    const handleBlur = () => {
        setIsInputVisible(false);
    };

    return (
        <Button isActive={isActive} onClick={handleButtonClick}>
            {isInputVisible ? (
                <input
                    ref={inputRef}
                    autoFocus
                    onBlur={handleBlur}
                    placeholder="직접입력"
                />
            ) : (
                <span>{content}</span>
            )}
        </Button>
    );
};

export default TodayGoalButton;
