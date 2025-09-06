import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodayHeader from './../component/Today/TodayHeader';
import TodayNav from './../component/Today/TodayNav';
import TodayProfile from './../component/Today/TodayProfile';
import TodayMainBox from "../component/Today/TodayMainBox";
import {useLocation, useNavigate} from "react-router-dom";
import TodayDeleteModal from "../component/Today/TodayDeleteModal";
import TodayGoalTitle from "../component/Today/TodayGoalTitle";
import TodayDoBox from '../component/Today/TodayDoBox';
import {GrFormClose} from "react-icons/gr";
import {PiUserCirclePlusFill} from "react-icons/pi";
import axios from "axios";


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

const TodayProfileButton = styled.div`
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  background-color: #F5F5F5;
  border: 1px solid #B6B6B5;
  margin: 10px auto;
  text-align: center;
  padding: 10px 0;
  color: #c02424;
`


export default function CareTodayPage(){
    const host = 'https://healody.shop';
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [recordData, setRecordData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null);

    const navigate = useNavigate()
    const {state} = useLocation()
    const {id, careName, careImage, homeId} = state;
    console.log(state)
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (image) {
            const data = new FormData();

            data.append("image", image);

            const requestDTO = {
                message : 'hi',
                id: id,
                nickname: newCareNickname,
            };

            const requestDataBlob = new Blob([JSON.stringify(requestDTO)], {
                type: "application/json",
            });
            data.append("requestDTO", requestDataBlob);

            axios
                .put(host + "/api/care-user", data, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    alert(response.data.message);
                    setShowModal(false); // 팝업 닫기
                    navigate('/family')
                })
                .catch((error) => {
                    console.error("새로운 돌봄 계정 생성 에러:", error);
                });
        }
    };
    useEffect(() => {
        // 데이터 가져오는 로직 (예시)
        const fetchUserData = async () => {
            try {
                const response = await fetch(host + '/api/care-user/note/' + id, {
                    method: 'GET',
                    headers:{
                        'Authorization' : 'Bearer ' + token
                    },
                });
                const data = await response.json();
                setUserName(data.data.nickname);
                setUserImage(data.data.image);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserData();
    }, []);

    const [activeButton, setActiveButton] = useState(null);
    const [activeGoal, setActiveGoal] = useState(null);
    const [activeCompleteButton, setActiveCompleteButton] = useState(false);
    const [newCareNickname, setNewCareNickname] = useState("");

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


    return (
        <Container>
            <TodayHeader />
            <TodayNav />
            <TodayProfile content="기록 더보기" link={"/create_careRecord"} moreLink={"/care_todayRecord"} param={id} userName={careName} userImage={careImage} id={id}/>
            <TodayDoBox />
            {/* 프로필 편집 팝업 */}
            {showModal && (
                <div className="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="w-60 flex flex-col bg-white p-6 rounded-2xl w-5/6">
                        <div className="flex items-center text-md font-bold mb-4">
                            <div className="flex items-center justify-center flex-1">
                                돌봄 계정 수정
                            </div>
                            <GrFormClose
                                className="text-4xl"
                                onClick={() => setShowModal(false)}
                            />
                        </div>
                        {/* 계정 생성 */}
                        <div className="flex-col items-center text-md font-bold mb-4 justify-center">
                            <div className="flex justify-center items-center mb-3">
                                <PiUserCirclePlusFill className="text-7xl" onClick={() => setShowModal(false)}/>
                            </div>
                            <div className="flex-col">
                                <div className="text-center mb-1">
                                    <input
                                        type="text"
                                        placeholder="돌봄 계정의 닉네임을 입력하세요"
                                        onChange={(event) =>
                                            setNewCareNickname(
                                                event.target
                                                    .value
                                            )
                                        }
                                        className="text-center text-xs border border-gray-300 rounded-3xl p-2 w-full text-#B6B6B5"
                                    />
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <div style={{ display: 'flex', justifyContent: 'center'}}>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                    >
                                        업로드
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <TodayProfileButton onClick={() => setShowModal(true)}>
                프로필 수정하기
            </TodayProfileButton>
        </Container>
    );
}