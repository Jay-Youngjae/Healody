import React from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import TodayGoalTitle from './TodayGoalTitle';
import TodayMoreBt from './TodayMoreBt';
import TodayPlusBt from './../../img/TodayPlusBt.svg';

const TodayBox = styled.div`
  background-color: #F5F5F5;
  border: 1px solid #B6B6B5;
  border-radius: 10px;
  padding: 10px 5px;
  box-sizing: border-box;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`

const TodayMainTopWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`

const MoreBt = styled.img`
  margin-bottom: 6px;
  cursor: pointer;
`

const TodayGoalBox = styled.div`
  background-color: white;
  border-radius: 10px;
  border: 1px solid #B6B6B5;
  text-align: center;
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-top: 5px;
`

const Text = styled.p`
  color: #60605F;
  font-size: 15px;
`

export default function TodayMainBox({ title, content, width, link, moreLink, text}){
    const navigate = useNavigate();

    function onMoveLink(){
        navigate(link);
    }

    return(
        <TodayBox>
            <TodayMainTopWrap>
                <TodayGoalTitle content={ title } width={ width }/>
                <MoreBt src={TodayPlusBt} onClick={onMoveLink}/>
            </TodayMainTopWrap>
            {moreLink ?
                <TodayMoreBt content={ content } link={ moreLink }/>
               : <></>
            }
            {text ?
                <TodayGoalBox>
                    <Text>새로운 목표를 설정하고 <br/>건강한 삶을 위한 한걸음을 내딛어요!</Text>
                </TodayGoalBox>
                : <></>
            }

        </TodayBox>
    )
}