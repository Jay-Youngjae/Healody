import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import TodayHeader from "../component/Today/TodayHeader";
import TodayNav from "../component/Today/TodayNav";
import TodayTitle from "../component/Today/TodayTitle";
import TodayGoalTitle from "../component/Today/TodayGoalTitle";

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
  border-radius: 10px;
  border: 1px solid #B6B6B5;
  background-color: #F5F5F5;
  padding: 15px 10px;
  margin-bottom: 10px;
`

const TodayBox = styled.div`
  border: 1px solid #B6B6B5;
  background-color: white;
  border-radius: 15px;
  padding: 10px;
`

const TodayGoalTypeButton = styled.div`
  background-color: #6F02DB;
  color: white;
  border: 0;
  border-radius: 15px;
  height: 30px;
  width: 60px;
  margin: 0 auto 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
export default function MyTodayRecordDetailPage(){
    const navigate = useNavigate();
    const host = 'https://healody.shop';
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const { type, id } = useParams()

    const [detailData, setDetailData] = useState(null);

    useEffect(() => {
        // 데이터 가져오는 로직 (예시)
        const fetchData = async () => {
            try {
                const response = await fetch(`${host}/api/note/${type}/${id}`,{
                    method: 'GET',
                    headers:{
                        'Authorization' : 'Bearer ' + token
                    },
                });
                const data = await response.json();
                setDetailData(data.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return(
        <Container>
            <TodayHeader />
            <TodayNav />
            <TodayTitle content="기록 조회" />

            {detailData &&
                <>
                    <TodayRecordBoxWrap>
                        <TodayGoalTitle content="날짜" width="65" />
                        <TodayBox>{detailData.date}</TodayBox>
                    </TodayRecordBoxWrap>
                    <TodayRecordBoxWrap>
                        <TodayGoalTitle content="제목" width="65" />
                        <TodayBox>{detailData.title}</TodayBox>
                    </TodayRecordBoxWrap>
                    { type === 'hospital' ?
                        <>
                            <TodayGoalTypeButton>병원</TodayGoalTypeButton>
                            <TodayRecordBoxWrap>
                                <TodayGoalTitle content="목적" width="65" />
                                <TodayBox>{detailData.purpose === 'OUTPATIENT' ? '외래' : detailData.purpose === 'HOSPITALIZATION' ? '입원' : '응급'}</TodayBox>
                            </TodayRecordBoxWrap>
                            <TodayRecordBoxWrap>
                                <TodayGoalTitle content="병원 이름" width="80" />
                                <TodayBox>{detailData.name}</TodayBox>
                            </TodayRecordBoxWrap>
                            <TodayRecordBoxWrap>
                                <TodayGoalTitle content="검사" width="65" />
                                <TodayBox>{detailData.surgery}</TodayBox>
                            </TodayRecordBoxWrap>
                        </>
                    : type === 'medicine' ?
                        <>
                            <TodayGoalTypeButton>약</TodayGoalTypeButton>
                            <TodayRecordBoxWrap>
                                <TodayGoalTitle content="약 *" width="65" />
                                {detailData.medicine1 && <TodayBox>{ detailData.medicine1 }</TodayBox>}
                                {detailData.medicine2 && <TodayBox style={{ marginTop: '10px' }}>{ detailData.medicine2 }</TodayBox>}
                                {detailData.medicine3 && <TodayBox style={{ marginTop: '10px' }}>{ detailData.medicine3 }</TodayBox>}
                            </TodayRecordBoxWrap>
                            <TodayRecordBoxWrap>
                                <TodayGoalTitle content="처방 병원 / 약국" width="120" />
                                <TodayBox>{detailData.place}</TodayBox>
                            </TodayRecordBoxWrap>
                        </>
                    : <>
                            <TodayGoalTypeButton>증상</TodayGoalTypeButton>
                            <TodayRecordBoxWrap>
                                <TodayGoalTitle content="증상" width="65" />
                                <TodayBox>{detailData.name}</TodayBox>
                            </TodayRecordBoxWrap>
                      </>
                    }

                    <TodayRecordBoxWrap>
                        <TodayGoalTitle content="메모" width="65" />
                        <TodayBox>{detailData.memo}</TodayBox>
                    </TodayRecordBoxWrap>
                </>
            }
        </Container>
    )
}