import React from 'react';
import styled from 'styled-components';
import MoreBottom from './../../img/moreBottom.svg';
import { useNavigate } from "react-router-dom";

const Button = styled.div`
  cursor: pointer;
  display: flex;
  width: 90%;
  margin: 10px auto 0 auto;
  flex-direction: row;
  justify-content: center;
  background-color: white;
  border: 1px solid #B6B6B5;
  padding: 5px;
  border-radius: 20px;
`

const MoreBtImage = styled.img`
  margin-right: 10px;
`

const MoreText = styled.p`
  color: #60605F;
  margin: 0;
  font-size: 13px;
`

export default function TodayMoreBt({content, link, id}){
    const navigate = useNavigate();

    return(
        <Button onClick={() => {
            navigate(link,{
                state : {
                    id: { id }
                }
            } );
        }}>
            <MoreBtImage src={MoreBottom} onClick={() => navigate(link,{
                state : {
                    id: { id }
                }
            } )}/>
            <MoreText>{content}</MoreText>
        </Button>
    )
}