import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodayHeader from "../component/Today/TodayHeader";
import TodayNav from "../component/Today/TodayNav";
import TodayTitle from "../component/Today/TodayTitle";
import TodayRecordBox from "../component/Today/TodayRecordBox";
import TodayDeleteModal from "../component/Today/TodayDeleteModal";
import TodayDeleteCheckBox from "../component/Today/TodayDeleteCheckBox";
import TodayPlusBt from './../img/TodayPlusBt.svg';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 360px;
  margin: 0 auto;
  z-index: 2;
  height: calc(100vh);
  box-sizing: border-box;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.5em;
  }
`;

const TodayRecordBoxWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TodayAddRecord = styled.img`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 20px;
  right: 10px;
  z-index: 1;
  cursor: pointer;
`;

const TodayDefault = styled.div`
  font-size: 20px;
  color: #60605F;
  height: calc(100vh - 240px);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodayNotRecord = styled.div`
  height: calc(100vh - 250px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`
export default function MyTodayRecordListPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteCheckBoxStates, setDeleteCheckBoxStates] = useState([]); // 삭제 확인 체크박스 상태 배열 추가
    const [recordData, setRecordData] = useState([]); // 데이터 가져오기
    const navigate = useNavigate();

    const host = 'https://healody.shop';
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        // 데이터 가져오는 로직 (예시)
        const fetchData = async () => {
            try {
                const response = await fetch(host + '/api/care-user/note/' + userId,{
                    method: 'GET',
                    headers:{
                        'Authorization' : 'Bearer ' + token
                    },
                });
                const data = await response.json();
                setRecordData(data.data);
                setDeleteCheckBoxStates(new Array(data.data.length).fill(false));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    function onMoveAddRecord() {
        navigate('/create_newRecord');
    }

    const handleDeleteButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleDeleteCheckBoxOpen = (index) => {
        setDeleteCheckBoxStates((prevState) => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
        });
    };

    const handleDeleteCheckBoxClose = (index) => {
        setDeleteCheckBoxStates((prevState) => {
            const newState = [...prevState];
            newState[index] = false;
            return newState;
        });
    };

    const handleDeleteRecord = async (index, purpose) => {
        // purpose 값에 따라 다른 URL 생성
        console.log(recordData)
        console.log(index)
        let deleteUrl;
        switch (purpose) {
            case '병원':
                deleteUrl = host + `/api/note/hospital/${recordData[index].noteId}`;
                break;
            case '약':
                deleteUrl = host + `/api/note/medicine/${recordData[index].noteId}`;
                break;
            case '증상':
                deleteUrl = host + `/api/note/symptom/${recordData[index].noteId}`;
                break;
            default:
                return;
        }

        console.log(deleteUrl)
        try {
            console.log(deleteUrl)
            await fetch(deleteUrl, {
                method: 'DELETE',
                headers:{
                    'Authorization' : 'Bearer ' + token
                },
            })
            window.location.reload()

        } catch (error) {
            alert('기록을 삭제할 수 없습니다.');
        }

    };

    function moveDetailRecord(type, id){
        switch(type){
            case '병원':
                navigate(`/care_todayRecord/hospital/${id}`);
                break;
            case '약':
                navigate(`/care_todayRecord/medicine/${id}`);
                break;
            case '증상':
                navigate(`/care_todayRecord/symptom/${id}`);
                break;
            default:
                return;
        }
    }

    return (
        <Container>
            <TodayHeader />
            <TodayNav />
            <TodayTitle content="기록 목록" />
            <TodayAddRecord src={TodayPlusBt} onClick={onMoveAddRecord} />
            <TodayRecordBoxWrap>
                {recordData.length !== 0 ?
                    <>
                        {recordData.map((record, index) => (
                            <React.Fragment key={index}>
                                <TodayRecordBox
                                    onClick={() => moveDetailRecord(record.noteType, record.noteId)}
                                    type={record.noteType}
                                    date={new Date(record.date).toISOString().split('T')[0]}
                                    content={record.title}
                                    onOpenModal={() => handleDeleteCheckBoxOpen(index)}
                                    onDelete={() => handleDeleteRecord(index, record.noteType)}
                                />
                                {deleteCheckBoxStates[index] && (
                                    <React.Fragment>
                                        <TodayDeleteModal isOpen={isModalOpen} onClose={() => handleDeleteCheckBoxClose(index)} />
                                        <TodayDeleteCheckBox
                                            content="삭제하시겠습니까?"
                                            buttonText="삭제하기"
                                            onDelete={() => handleDeleteRecord(index, record.noteType)}
                                        />
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        ))}
                    </> : <TodayNotRecord>오늘 하루 나는 어땠나요?<br/> 나의 건강을 기록하고 추적해봐요!</TodayNotRecord>}
            </TodayRecordBoxWrap>
        </Container>
    );
}
