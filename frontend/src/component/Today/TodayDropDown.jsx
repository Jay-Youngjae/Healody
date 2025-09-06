import React, { useState } from 'react';
import styled from 'styled-components';

const DropDownButton = styled.button`
  margin: 0 auto;
  background-color: #6F02DB;
  border: 0;
  border-radius: 20px;
  padding: 5px 10px;
  box-sizing: border-box;
  color: white;
  width: 62px;
  text-align: center;
`;

const DropDownListContainer = styled.ul`
  position: absolute;
  background-color: white;
  border: 1px solid #B6B6B5;
  border-radius: 5px;
  width: 67px;
  padding: 0;
  list-style: none;
  margin: 0;
  display: ${props => (props.open ? 'block' : 'none')};
`;

const DropDownItem = styled.li`
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default function TodayDropDown({ selectedValue, options, onClick }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropDownClick = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        onClick(item);
        setIsOpen(false);
    };

    return (
        <>
            <DropDownButton onClick={handleDropDownClick}>
                {selectedValue}
            </DropDownButton>
            <DropDownListContainer open={isOpen}>
                {options.map((option) => (
                    <DropDownItem key={option} onClick={() => handleItemClick(option)}>
                        {option}
                    </DropDownItem>
                ))}
            </DropDownListContainer>
        </>
    );
}
