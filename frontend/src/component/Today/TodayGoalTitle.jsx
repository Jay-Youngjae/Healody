import React from 'react';
import styled from 'styled-components';
import check from './../../img/CircleCheckIcon.svg';

const Button = styled.div`
  background-color: #6F02DB;
  color: white;
  border: 0;
  border-radius: 15px;
  height: 26px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
  width: ${props => props.width}px; /* Dynamic width based on prop */
`

const ButtonImg = styled.img`
  width: 13px;
  height: 13px;
`

const ButtonTitle = styled.p`
  margin-left: 3px;
  color: white;
  font-size: 13px;
`

const TodayGoalTitle = ({ content, width }) => { // Receive 'width' as a prop
    return (
        <Button width={width}>
            <ButtonImg src={check} />
            <ButtonTitle>{content}</ButtonTitle>
        </Button>
    )
}

export default TodayGoalTitle;
