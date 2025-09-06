import React, { useState, FormEvent, useEffect } from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import styled from 'styled-components';
import { GrFormClose } from "react-icons/gr";
import { PiUserCirclePlusFill } from "react-icons/pi";
import TodayHeader from "./../component/Today/TodayHeader";
import TodayNav from "./../component/Today/TodayNav";
import FamilyBox from "../component/FamilyBox";
import { BsPlus } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";

const FamilyWrap = styled.div`
  display: flex;
  justify-content: space-between;
`
const Container = styled.div`
  width: 360px;
  margin: 0 auto;
  position: relative;
`

const Family_main = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const [createCareAccount, setCreateCareAccount] = useState(false);
    const [selectedFamily, setSelectedFamily] = useState('');
    const [selectedHome, setSelectedHome] = useState('');
    const [selectedFamilyList, setSelectedFamilyList] = useState([]);
    const [profilePicture, setProfilePicture] = useState(null);
    const [nickname, setNickname] = useState("");
    const [newCareNickname, setNewCareNickname] = useState("");
    const [image, setImage] = useState(null);
    const [familyData, setFamilyData] = useState([]);
    const host = "https://healody.shop";
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const navigate = useNavigate();
    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const handleToggleClick = () => {
        setShowOptions(!showOptions);
    };

    const handleCareClick = () => {
        setCreateCareAccount(!createCareAccount);
    };

    const handleFamilySelect = (family) => {
        setSelectedHome(family);
        // console.log(selectedFamilyList[family].user)

        getFamilyList(family)
        setShowOptions(false); // 선택하기 버튼을 누르면 옵션 창을 닫도록 추가
    };

    function getFamilyList(family){
        setSelectedHome(family)
    }


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
                homeId: familyData[selectedHome].home.home_id,
                nickname: newCareNickname,
            };

            const requestDataBlob = new Blob([JSON.stringify(requestDTO)], {
                type: "application/json",
            });
            data.append("requestDTO", requestDataBlob);

            axios
                .post(host + "/api/care-user", data, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    alert(response.data.message);
                    setNewCareNickname(""); // 입력 필드 초기화
                    setCreateCareAccount(false); // 팝업 닫기
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("새로운 돌봄 계정 생성 에러:", error);
                });
        }
    };

    useEffect(() => {
        const getFamilyData = async () => {
            axios
                .get(host + "/api/home/" + userId, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    setFamilyData(response.data.data);
                    setSelectedFamilyList(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getFamilyData();
    }, []);

    return (
        <Container>
                <TodayHeader />
                <TodayNav />
                {/* Centered Box */}
                {/* Main */}
                <div className="text-center ml-6 mr-6">
                    {/* 가족 계정 */}
                    <div className="mb-10">
                        {/* 가족 계정-헤더 */}
                        <div className="flex justify-between items-center mb-4 mt-6">
                            <div>
                                <button
                                    className="bg-purple-600 text-white py-2 px-4 rounded-3xl"
                                    style={{ backgroundColor: "#6F02DB" }}
                                    onClick={handleToggleClick}
                                >
                                    { selectedHome } ▽
                                </button>

                                {showOptions && (
                                    <div className="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-40 flex items-center justify-center">
                                        <div className="w-60 flex flex-col bg-white p-6 rounded-2xl">
                                            {Object.keys(familyData).map((key) => (
                                                <button
                                                    className="text-black py-2 px-4 rounded-3xl rounded-lg border border-gray-300 w-full my-2"
                                                    onClick={() => handleFamilySelect(key)}
                                                    key={key}
                                                >
                                                    {key}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                                <BsPlus onClick={() => {
                                    navigate('/Family_invite/',{
                                        state : {
                                            id: familyData[selectedHome].home.home_id
                                        }
                                    } );
                                }} className="w-14 h-14" />

                        </div>

                        {/* 가족 계정-컨텐츠 */}
                            {selectedFamilyList[selectedHome] ? (
                                Object.keys(selectedFamilyList[selectedHome].user).map((userId) => (
                                    <FamilyBox
                                        onClick={() => {
                                            navigate('/care_today',{
                                                state : {
                                                    id: familyData[selectedHome].user[userId].id,
                                                    name: familyData[selectedHome].user[userId].name,
                                                    nickname: familyData[selectedHome].user[userId].nickname,
                                                    profileImage: familyData[selectedHome].user[userId].image,
                                                }
                                            } );
                                        }}
                                        image={selectedFamilyList[selectedHome].user[userId].image}
                                        name={selectedFamilyList[selectedHome].user[userId].name}
                                        nickname={selectedFamilyList[selectedHome].user[userId].nickname} />
                                ))
                            ) : (
                                // 선택한 가족에 사용자 정보가 없는 경우 예외 처리
                                <div>집을 선택하세요</div>
                            )}

                    </div>

                    {/* 돌봄 계정 */}
                    <div>
                        {/* 돌봄 계정-헤더 */}
                        <div style={{ marginBottom : '15px'}}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <button
                                    className="bg-purple-600 text-white py-2 px-4 rounded-3xl"
                                    style={{ backgroundColor: "#6F02DB" }}
                                >
                                    돌봄계정
                                </button>

                                <BsPlus
                                    className="w-14 h-14"
                                    onClick={handleCareClick}
                                />
                            </div>
                            <div>
                                {selectedFamilyList[selectedHome] ? (
                                    Object.keys(selectedFamilyList[selectedHome].careUser).map((userId) => (
                                        <FamilyBox
                                            image={selectedFamilyList[selectedHome].careUser[userId].image}
                                            name={selectedFamilyList[selectedHome].careUser[userId].nickname}
                                            onClick={() => {
                                                navigate('/care_today',{
                                                    state : {
                                                        id: familyData[selectedHome].careUser[userId].id,
                                                        careName: familyData[selectedHome].careUser[userId].nickname,
                                                        careImage: familyData[selectedHome].careUser[userId].image,
                                                        homeId: familyData[selectedHome].home.home_id
                                                    }
                                                } );
                                            }}
                                        />
                                    ))
                                ) : (
                                    // 선택한 가족에 사용자 정보가 없는 경우 예외 처리
                                    <div>집을 선택하세요</div>
                                )}
                            </div>
                            {/* 프로필 편집 팝업 */}
                            {createCareAccount && (
                                <div className="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-40 flex items-center justify-center">
                                    <div className="w-60 flex flex-col bg-white p-6 rounded-2xl w-5/6">
                                        <div className="flex items-center text-md font-bold mb-4">
                                            <div className="flex items-center justify-center flex-1">
                                                새 돌봄 계정
                                            </div>
                                            <GrFormClose
                                                className="text-4xl"
                                                onClick={handleCareClick}
                                            />
                                        </div>
                                        {/* 계정 생성 */}
                                        <div className="flex-col items-center text-md font-bold mb-4 justify-center">
                                            <div className="flex justify-center items-center mb-3">
                                                <PiUserCirclePlusFill className="text-7xl" />
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
                                                <div>
                                                    {/*<button className="bg-black text-white py-2 px-4 rounded-3xl rounded-3xl border border-gray-300 w-full my-2" onClick={handleNewCareAccountCreate}>확인</button>*/}
                                                </div>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
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
                            )}
                        </div>
                    </div>
                </div>
        </Container>
    );
};

export default Family_main;
