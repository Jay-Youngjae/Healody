// CreateNewGoalPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import TodayHeader from './../component/Today/TodayHeader';
import TodayNav from './../component/Today/TodayNav';
import TodayTitle from './../component/Today/TodayTitle';
import TodayButton from './../component/Today/TodayButton';
import TodayListButton from './../component/Today/TodayListButton';
import TodayGoalTitle from './../component/Today/TodayGoalTitle';
import TodayGoalButton from './../component/Today/TodayGoalButton';

const Container = styled.div`
  width: 360px;
  margin: 0 auto;
  position: relative;
`;

const TodayListWrap = styled.div`
  width: 330px;
  margin: 0 auto;
  display: ${props => (props.isVisible ? 'block' : 'none')};
  background-color: #F5F5F5;
  border-radius: 10px;
  border: 0.5px solid #B6B6B5;
  padding: 10px;
  box-sizing: border-box;
`;

const TodayGoalWrap = styled.div`
  margin: 15px auto 0 auto;
  width: 330px;
  background-color: #F5F5F5;
  border-radius: 10px;
  border: 0.5px solid #B6B6B5;
  padding: 15px 10px;
  box-sizing: border-box;
`

const TodayGoalButtonWrap = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`

const FixedTodayButton = styled(TodayButton)`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`

const GoalInput = styled.input`
  cursor: pointer;
  width: 80px;
  padding: 0 10px;
  font-size: 14px;
  border-radius: 15px;
  border: 1px solid #B6B6B5;
  background-color: white;
  color: black;
`

function CreateNewGoalPage() {
    const navigate = useNavigate();
    const [showListWrap, setShowListWrap] = useState(true);
    const [activeButton, setActiveButton] = useState(null);
    const [activeGoal, setActiveGoal] = useState(null);
    const [customGoal, setCustomGoal] = useState('');
    const [activeCompleteButton, setActiveCompleteButton] = useState(false);

    const host = 'https://healody.shop';
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const handleButtonClick = buttonContent => {
        if (activeButton === buttonContent) {
            setActiveButton(null);
        }else{
            setActiveButton(buttonContent);
        }

        setActiveCompleteButton(buttonContent !== '');
    };

    const handleGoalClick = buttonContent => {
        setCustomGoal('');
        if (activeGoal === buttonContent) {
            setActiveGoal(null);
        } else{
            setActiveGoal(buttonContent);
        }

        setActiveCompleteButton(buttonContent !== '');
    };

    const handleCustomGoalInput = (event) => {
        setCustomGoal(event.target.value);
    };

    const handleCompleteClick = (e) => {
        var behavior;
        if(activeButton === '물마시기'){
            behavior = 'DRINK_WATER';
        }else if(activeButton === '금주하기'){
            behavior = 'ABSTAIN_DRINK';
        } else if(activeButton === '금연하기'){
            behavior = 'QUIT_SMOKING';
        } else{
            behavior = 'DO_EXERCISE';
        }

        const requestBody = {
            "behavior" : behavior,
            "quantity": (customGoal !== null && customGoal !== '') ? customGoal : activeGoal
        }
        axios({
            url: host + '/api/goal',
            method: 'POST',
            headers:{
                'Authorization' : 'Bearer ' + token
            },
            data: requestBody
        }).then((response) =>{
            console.log(response);
            if(response.status === 200){
                alert(response.data.data);
                navigate('/my_today');
            }
        }).catch(function(){
            alert('목표가 설정되지 않았습니다.');
        })
    }

    return (
        <Container>
            <TodayHeader/>
            <TodayNav/>
            <TodayTitle content="오늘 나의 목표관리"/>
            <TodayListWrap isVisible={showListWrap}>
                <TodayGoalTitle content="목표 설정하기" width="120"/>
                <TodayListButton
                    content="물마시기"
                    isActive={activeButton === '물마시기'}
                    onClick={() => handleButtonClick('물마시기')}
                />
                <TodayListButton
                    content="금주하기"
                    isActive={activeButton === '금주하기'}
                    onClick={() => handleButtonClick('금주하기')}
                />
                <TodayListButton
                    content="금연하기"
                    isActive={activeButton === '금연하기'}
                    onClick={() => handleButtonClick('금연하기')}
                />
                <TodayListButton
                    content="운동하기"
                    isActive={activeButton === '운동하기'}
                    onClick={() => handleButtonClick('운동하기')}
                />
            </TodayListWrap>
            {activeButton === '운동하기' ?
                <TodayGoalWrap>
                    <TodayGoalTitle content="하루 목표량" width="100"/>
                    <TodayGoalButtonWrap>
                        <TodayGoalButton
                            content="1시간"
                            isActive={activeGoal === '1시간'}
                            onClick={() => handleGoalClick('1시간')}
                        />
                        <TodayGoalButton
                            content="2시간"
                            isActive={activeGoal === '2시간'}
                            onClick={() => handleGoalClick('2시간')}
                        />
                        <TodayGoalButton
                            content="3시간"
                            isActive={activeGoal === '3시간'}
                            onClick={() => handleGoalClick('3시간')}
                        />
                        <GoalInput
                            type="text"
                            value={ customGoal }
                            onChange={(event) => {
                                setActiveGoal(null);
                                setCustomGoal(event.target.value);
                            }}
                            placeholder="직접 입력"
                        />
                    </TodayGoalButtonWrap>
                </TodayGoalWrap> : ''}
            {activeButton === '물마시기' ?
                <TodayGoalWrap>
                    <TodayGoalTitle content="하루 목표량" width="100"/>
                    <TodayGoalButtonWrap>
                        <TodayGoalButton
                            content="0.5L"
                            isActive={activeGoal === '0.5L'}
                            onClick={() => handleGoalClick('0.5L')}
                        />
                        <TodayGoalButton
                            content="1L"
                            isActive={activeGoal === '1L'}
                            onClick={() => handleGoalClick('1L')}
                        />
                        <TodayGoalButton
                            content="1.5L"
                            isActive={activeGoal === '1.5L'}
                            onClick={() => handleGoalClick('1.5L')}
                        />
                        <GoalInput
                            type="text"
                            value={ customGoal }
                            onChange={(event) => {
                                setActiveGoal(null);
                                setCustomGoal(event.target.value);
                            }}
                            placeholder="직접 입력"
                        />
                    </TodayGoalButtonWrap>
                </TodayGoalWrap> : ''}

            <FixedTodayButton isActive={activeCompleteButton} onClick={handleCompleteClick}
                              content='목표 설정하기'>
            </FixedTodayButton>
        </Container>
    );
}

export default CreateNewGoalPage;

