import React from 'react';
import backIcon from './../../img/back_icon.png';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Back = styled.img`
  position: absolute;
  left: 5px;
`

const Title = styled.p`
  text-align: center;
  color: #60605F;
  font-weight: 7000;
`
const TodayTitle = ({content}) => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate(-1);
    };

    return(
        <Container>
            <Back src={backIcon} onClick={handleLogoClick} />
            <Title>{content}</Title>
        </Container>
    )
}

export default TodayTitle;