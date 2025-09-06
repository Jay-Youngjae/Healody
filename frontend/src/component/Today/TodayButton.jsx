import React from 'react';
import styled from 'styled-components';

const FixedButton = styled.button`
  background-color: ${props => (props.isActive ? '#6F02DB' : '#E9D9FA')};
  color: white;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 330px;
  height: 50px;
  border: 0;
  font-size: 16px;
  border-radius: 5px;
`;

const TodayButton = ({ isActive, onClick, content }) => {
    return (
        <FixedButton isActive={isActive} onClick={onClick}>
            {content}
        </FixedButton>
    );
};

export default TodayButton;
