import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodayHeader from './../component/Today/TodayHeader';
import TodayNav from './../component/Today/TodayNav';
import TodayProfile from './../component/Today/TodayProfile';
import TodayMainBox from "../component/Today/TodayMainBox";
import {useLocation, useNavigate} from "react-router-dom";
import TodayDeleteModal from "../component/Today/TodayDeleteModal";
import TodayGoalTitle from "../component/Today/TodayGoalTitle";
import Delete from "../img/threeDot.svg";
import water25 from '../img/water25.svg';
import water50 from '../img/water50.svg';
import water75 from '../img/water75.svg';
import water100 from '../img/water100.svg';
import starGoal from '../img/goalStar.svg';
import alco from '../img/alcohol.svg';
import noAlco from '../img/noAlcohol.svg';
import smoke from '../img/smoke.svg';
import noSmoke from '../img/noSmoke.svg';
import exer25 from '../img/exer25.svg';
import exer50 from '../img/exer50.svg';
import exer75 from '../img/exer75.svg';
import exer100 from '../img/exer100.svg';
import TodayDoBox from '../component/Today/TodayDoBox';
import TodayDeleteCheckBox from "../component/Today/TodayDeleteCheckBox";


const Container = styled.div`
  width: 360px;
  margin: 0 auto;
  position: relative;
`

const TodayRecordBoxWrap = styled.div`
  position: relative;
  border-radius: 10px;
  border: 1px solid #B6B6B5;
  background-color: #F5F5F5;
  padding: 15px 10px;
  margin-bottom: 10px;
  margin-top: 10px
`

const TodayRecordBoxTitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 5px;
`

const TodayRecordDelete = styled.img`
  cursor: pointer;
  position: relative;
`

const TodayGoalName = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 4px 10px;
  font-size: 12px;
  color: #787878;
  border: 1px solid #787878;
  font-weight: bolder;
`

const TodayRecordContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #B6B6B5;
  background-color: white;
  margin-top: 10px;
  padding: 10px;
`

const TodayTitle = styled.h2`
  color: black;
`

const TodayDates = styled.p`
  color: #787878;
`

const TodayGoalDetailWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 0 10px;
`

const StarWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 85%;
  margin: 0 auto;
`

const WaterWrap = styled.div`
  margin: 5px auto 0 auto;
  width: 85%;
  display: flex;
  justify-content: space-between;
`

const StarAlcoWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;
  margin: 0 auto;
`

const AlcoholWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 5px auto 0 auto;
`

const StarImg = styled.img`
  width: 30px;
`

const WaterImg = styled.img`
  width: 30px;
`


export default function MyTodayPage(){
    const host = 'https://healody.shop';
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [userName, setUserName] = useState('');
    const [userBirth, setUserBirth] = useState('');
    const [userImage, setUserImage] = useState('');
    const [recordData, setRecordData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // console.log(token, userId)
    useEffect(() => {
        // 데이터 가져오는 로직 (예시)
        const fetchData = async () => {
            try {
                const response = await fetch(host + '/api/goal/' + userId,{
                    method: 'GET',
                    headers:{
                        'Authorization' : 'Bearer ' + token
                    }
                });
                const data = await response.json();
                console.log(data.result)
                { data.result === 'SUCCESS' ? setRecordData(data) : setRecordData(null)}
                console.log(recordData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // 데이터 가져오는 로직 (예시)
        const fetchUserData = async () => {
            try {
                const response = await fetch(host + '/api/user', {
                    method: 'GET',
                    headers:{
                        'Authorization' : 'Bearer ' + token
                    },
                });
                const data = await response.json();
                setUserName(data.data.nickname);
                setUserImage(data.data.image);
                setUserBirth(data.data.birth);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserData();
    }, []);

    const [activeButton, setActiveButton] = useState(null);
    const [activeGoal, setActiveGoal] = useState(null);
    const [activeCompleteButton, setActiveCompleteButton] = useState(false);
    const handleButtonClick = buttonContent => {
        if (activeButton === buttonContent) {
            setActiveButton(null);
            setActiveGoal(null);
        } else {
            setActiveButton(buttonContent);
            setActiveGoal(buttonContent);
        }
        if(activeButton !== ''){
            setActiveCompleteButton(true);
        }else{
            setActiveCompleteButton(false);
        }
    };

    console.log(recordData)
    return (
        <Container>
            <TodayHeader />
            <TodayNav />
            <TodayProfile content="내 기록 더보기" link="/create_newRecord" moreLink="/my_todayRecord" userName={userName} userBirth={userBirth} userImage={userImage}/>
            <TodayDoBox />

            {recordData == null ? (
                <TodayMainBox title="목표 목록" width="90" content="내 목표 더보기" link="/create_newGoal" text="goal" />
            ) : (
                <TodayRecordBoxWrap>
                    <TodayRecordBoxTitleWrap>
                        <TodayGoalTitle content="목표 관리" width="100" />

                        {recordData.data.behavior === '물마시기' ? (
                            <TodayGoalName>
                                💧 {recordData.data.behavior} 도전중
                            </TodayGoalName>
                        ) : recordData.data.behavior === '운동하기' ? (
                            <TodayGoalName>
                                🏋🏻‍ {recordData.data.behavior} 도전중
                            </TodayGoalName>
                        ) : recordData.data.behavior === '금연하기' ? (
                            <TodayGoalName>
                                🚬 {recordData.data.behavior} 도전중
                            </TodayGoalName>
                        ) : (
                            <TodayGoalName>
                                🍻 {recordData.data.behavior} 도전중
                            </TodayGoalName>
                        )}
                        {/*<TodayRecordDelete src={Delete} />*/}
                    </TodayRecordBoxTitleWrap>
                    <TodayRecordContentWrap>
                        <TodayTitle>목표 {recordData.data.days} 일차</TodayTitle>
                        <TodayDates>{recordData.data.startDate} ~ {recordData.data.endDate}</TodayDates>
                        {recordData.data.behavior === '물마시기' ? (
                            <TodayGoalDetailWrap>
                                <StarWrap><StarImg src={starGoal} /></StarWrap>
                                <WaterWrap>
                                    <WaterImg src={water25} />
                                    <WaterImg src={water50} />
                                    <WaterImg src={water75} />
                                    <WaterImg src={water100} />
                                </WaterWrap>
                            </TodayGoalDetailWrap>
                        ) : recordData.data.behavior === '금주하기' ? (
                            <TodayGoalDetailWrap>
                                <StarAlcoWrap><StarImg src={starGoal} /></StarAlcoWrap>
                                <AlcoholWrap>
                                    <WaterImg src={alco} />
                                    <WaterImg src={noAlco} />
                                </AlcoholWrap>
                            </TodayGoalDetailWrap>
                        ) : recordData.data.behavior === '금연하기' ? (
                            <TodayGoalDetailWrap>
                                <StarAlcoWrap><StarImg src={starGoal} /></StarAlcoWrap>
                                <AlcoholWrap>
                                    <WaterImg src={smoke} />
                                    <WaterImg src={noSmoke} />
                                </AlcoholWrap>
                            </TodayGoalDetailWrap>
                        ) : (
                            <TodayGoalDetailWrap>
                                <StarWrap><StarImg src={starGoal} /></StarWrap>
                                <WaterWrap>
                                    <WaterImg src={exer25} />
                                    <WaterImg src={exer50} />
                                    <WaterImg src={exer75} />
                                    <WaterImg src={exer100} />
                                </WaterWrap>
                            </TodayGoalDetailWrap>
                        )}
                    </TodayRecordContentWrap>
                </TodayRecordBoxWrap>
            )}
            {/*{showModal && (*/}
            {/*    <React.Fragment>*/}
            {/*        <TodayDeleteModal isOpen={showModal} onClose={() => setShowModal(false)} />*/}
            {/*        <TodayDeleteCheckBox*/}
            {/*            content="삭제하시겠습니까?"*/}
            {/*            buttonText="삭제하기"*/}
            {/*            onDelete={() => handleDeleteGoal(index, recordData..noteType)}*/}
            {/*        />*/}
            {/*    </React.Fragment>*/}
            {/*)}*/}
        </Container>
    );
}