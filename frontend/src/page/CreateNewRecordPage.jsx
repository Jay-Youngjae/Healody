import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import axios from 'axios';
import plusBtn from './../img/TodayPlusBt.svg';
import TodayHeader from './../component/Today/TodayHeader';
import TodayNav from './../component/Today/TodayNav';
import TodayTitle from './../component/Today/TodayTitle';
import TodayGoalTitle from "../component/Today/TodayGoalTitle";
import TodayDropDown from "../component/Today/TodayDropDown";
import TodayRecordTypeButton from "../component/Today/TodayRecordTypeButton";
import TodayButton from "../component/Today/TodayButton";
import { useNavigate } from "react-router-dom";
import TodayMakeGoal from './../component/Today/TodayMakeGoal';

axios.defaults.withCredentials = true;

const Container = styled.div`
  width: 360px;
  margin: 0 auto;
`;

const TodayListWrap = styled.div`
  width: 330px;
  margin: 0 auto 15px auto;
  background-color: #F5F5F5;
  border-radius: 10px;
  border: 0.5px solid #B6B6B5;
  padding: 15px 10px;
  box-sizing: border-box;
`

const TodayTypeListWrap = styled.div`
  width: 330px;
  margin: 15px auto;
  background-color: #F5F5F5;
  border-radius: 10px;
  border: 0.5px solid #B6B6B5;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const TodayDateInputWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 60% 40%;
`

const TodayInputWrap = styled.div`
  width: 100%;
`

const TodayDateInput = styled.input`
  background-color: white;
  border: 1px solid #B6B6B5;
  border-radius: 15px;
  margin-right: 5px;
  padding: 2px 4px;
  box-sizing: border-box;
`

const TodayTimeInput = styled.input`
  background-color: white;
  border: 1px solid #B6B6B5;
  border-radius: 15px;
  padding: 2px 4px;
  box-sizing: border-box;
`

const TodayTitleInput = styled.input`
  width: 100%;
  background-color: white;
  border: 1px solid #B6B6B5;
  border-radius: 15px;
  padding: 5px 10px;
  box-sizing: border-box;
  color: #B6B6B5;
`

const TodayMemoInput = styled.textarea`
  width: 100%;
  background-color: white;
  border: 1px solid #B6B6B5;
  border-radius: 15px;
  padding: 5px 10px;
  box-sizing: border-box;
  line-height: 1.5;
  color: #B6B6B5;
  min-height: 50px;
  resize: none;
`;

const TodayMedicWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const TodayMedicAddBt = styled.img`
  padding-bottom: 5px;
  box-sizing: border-box;
`

const ChangeContainer = styled.div`
  margin-bottom: 80px;
  margin-top: 15px;
`

const TodayDropDownWrap = styled.div`
  position: relative;
  padding-left: 20px;
`

function CreateNewRecordPage(){
    const navigate = useNavigate();
    const host = 'https://healody.shop';
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [selectedDropDownValue, setSelectedDropDownValue] = useState('병원');
    const [selectedPurpose, setSelectedPurpose] = useState('');
    const [formData, setFormData] = useState({
        date: "",
        title: "",
        purpose: "",
        name: "",
        surgery: "",
        medicine1: "",
        medicine2: "",
        medicine3: "",
        place: "",
        memo: ""
    });

    const [medicineInputs, setMedicineInputs] = useState(1);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddMedicineInput = () => {
        if (medicineInputs < 3) {
            setMedicineInputs(medicineInputs + 1);
        }
    };

    const handleRemoveMedicineInput = () => {
        if (medicineInputs > 1) {
            setMedicineInputs(medicineInputs - 1);
            setFormData((prevFormData) => {
                const updatedFormData = { ...prevFormData };
                delete updatedFormData[`medicine${medicineInputs}`];
                return updatedFormData;
            });
        }
    };
    const handleSave = () => {
        // 병원일 때 호출
        if (selectedDropDownValue === '병원') {
            const requestBody = {
                date: formData.date + ' ' + formData.time,
                purpose: selectedPurpose,
                name: formData.name,
                surgery: formData.surgery,
                memo: formData.memo,
                title: formData.title,
            };
            axios({
                url: host + '/api/note/hospital',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  'Bearer ' + token,
                    "Access-Control-Allow-Origin" : "*"
                },
                data: requestBody
            }).then(function(response){
                alert('기록이 생성되었습니다')
                navigate('/my_todayRecord')
            }).catch(function(error){
                console.log(error)
                if(error.response.status === 400){
                    alert('빈칸 없이 입력해주세요')
                }
            })
        } else if (selectedDropDownValue === '약') {
            const requestBody = {
                date: formData.date + ' ' + formData.time,
                title: formData.title,
                medicine1: formData.medicine1,
                medicine2: formData.medicine2,
                medicine3: formData.medicine3,
                place: formData.place,
                memo: formData.memo
            };
            axios({
                url: host + '/api/note/medicine',
                method: 'POST',
                headers:{
                    'Authorization' : 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin" : "*"
                },
                data: requestBody
            }).then(function(data){
                alert('기록이 생성되었습니다')
                navigate('/my_todayRecord')
            }).catch(function(error){
                console.log(error.code)
            })
        } else if (selectedDropDownValue === '증상') {
            const requestBody = {
                date: formData.date + ' ' + formData.time,
                title: formData.title,
                name: formData.name,
                memo: formData.memo
            };
            axios({
                url: host + '/api/note/symptom',
                method: 'POST',
                headers: {
                    'Authorization':'Bearer '+ token,
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin" : "*"
                },
                data: requestBody
            }).then(function(response){
                alert('기록이 생성되었습니다')
                navigate('/my_todayRecord')
            }).catch(function(error){
                if(error.status === 400){
                    alert('빈칸 없이 입력해주세요')
                }
            })
        }
    };
    return(
        <Container>
            <TodayHeader/>
            <TodayNav />
            <TodayTitle content="오늘 나의 건강 관리하기"/>
            <TodayListWrap>
                <TodayGoalTitle content="날짜" width="65" />
                <TodayDateInputWrap>
                    <TodayDateInput type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}/>
                    <TodayTimeInput type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}/>
                </TodayDateInputWrap>
            </TodayListWrap>
            <TodayListWrap>
                <TodayGoalTitle content="제목" width="65" />
                <TodayInputWrap>
                    <TodayTitleInput type="text" placeholder='제목을 입력하세요.'
                                     name="title"
                                     value={formData.title}
                                     onChange={handleInputChange}/>
                </TodayInputWrap>
            </TodayListWrap>
            <TodayDropDownWrap>
                <TodayDropDown
                    selectedValue={selectedDropDownValue}
                    options={['병원', '약', '증상']}
                    onClick={(value) => setSelectedDropDownValue(value)}
                />
            </TodayDropDownWrap>
            {selectedDropDownValue === '병원' ? (
                <ChangeContainer>
                    <TodayTypeListWrap>
                        <TodayRecordTypeButton
                            content="외래"
                            width="70"
                            active={selectedPurpose === 'OUTPATIENT'}
                            onClick={() => setSelectedPurpose('OUTPATIENT')}
                        />
                        <TodayRecordTypeButton
                            content="입원"
                            width="70"
                            active={selectedPurpose === 'HOSPITALIZATION'}
                            onClick={() => setSelectedPurpose('HOSPITALIZATION')}
                        />
                        <TodayRecordTypeButton
                            content="응급"
                            width="70"
                            active={selectedPurpose === 'EMERGENCY'}
                            onClick={() => setSelectedPurpose('EMERGENCY')}
                        />
                    </TodayTypeListWrap>
                    <TodayListWrap>
                        <TodayGoalTitle content="병원*" width="70" />
                        <TodayInputWrap>
                            <TodayTitleInput type="text" placeholder='병원 이름을 입력하세요.'
                                             name="name"
                                             value={formData.name}
                                             onChange={handleInputChange}/>
                        </TodayInputWrap>
                    </TodayListWrap>
                    <TodayListWrap>
                        <TodayGoalTitle content="검사, 시술, 수술" width="120" />
                        <TodayInputWrap>
                            <TodayTitleInput type="text" placeholder='검사, 시술, 수술에 대해 입력하세요.'
                                             name="surgery"
                                             value={formData.surgery}
                                             onChange={handleInputChange}/>
                        </TodayInputWrap>
                    </TodayListWrap>
                    <TodayListWrap>
                        <TodayGoalTitle content="메모" width="60" />
                        <TodayInputWrap>
                            <TodayMemoInput type="text" placeholder='방문 전에는 궁금한 점을 메모하고, 이후에는 진료 내용을 남겨보세요'
                                            name="memo"
                                            value={formData.memo}
                                            onChange={handleInputChange}/>
                        </TodayInputWrap>
                    </TodayListWrap>
                </ChangeContainer>
            ) : selectedDropDownValue === '약' ? (
                <ChangeContainer>
                    <TodayListWrap>
                        <TodayMedicWrap>
                            <TodayGoalTitle content="약*" width="65" />
                            {medicineInputs < 3 ? (
                                <TodayMedicAddBt src={plusBtn} onClick={handleAddMedicineInput} />
                            ) : null}
                        </TodayMedicWrap>
                        <TodayInputWrap>
                            {Array.from({ length: medicineInputs }, (_, index) => (
                                <TodayTitleInput
                                    key={`medicineInput_${index}`}
                                    type="text"
                                    placeholder={`약의 종류 ${index + 1}를 입력하세요`}
                                    name={`medicine${index + 1}`}
                                    value={formData[`medicine${index + 1}`] || ""}
                                    onChange={handleInputChange}
                                />
                            ))}
                        </TodayInputWrap>
                    </TodayListWrap>
                    <TodayListWrap>
                        <TodayGoalTitle content="처방 병원 / 약국" width="120" />
                        <TodayInputWrap>
                            <TodayTitleInput type="text" placeholder='처방 받은 병원과 약국을 입력하세요'
                                             name="place"
                                             value={formData.place}
                                             onChange={handleInputChange}/>
                        </TodayInputWrap>
                    </TodayListWrap>
                    <TodayListWrap>
                        <TodayGoalTitle content="메모" width="60" />
                        <TodayInputWrap>
                            <TodayMemoInput type="text" placeholder='자세히 적을수록 좋아요. (ex.효과, 부작용)'
                                            name="memo"
                                            value={formData.memo}
                                            onChange={handleInputChange}/>
                        </TodayInputWrap>
                    </TodayListWrap>
                </ChangeContainer>
            ) : (
                <ChangeContainer>
                    <TodayListWrap>
                        <TodayGoalTitle content="증상*" width="70" />
                        <TodayInputWrap>
                            <TodayTitleInput type="text" placeholder='나타나는 증상을 입력하세요'
                                             name="name"
                                             value={formData.name}
                                             onChange={handleInputChange}/>
                        </TodayInputWrap>
                    </TodayListWrap>
                    <TodayListWrap>
                        <TodayGoalTitle content="메모" width="60" />
                        <TodayInputWrap>
                            <TodayMemoInput type="text" placeholder='자세히 적을수록 좋아요. (ex. 증상, 통증)'
                                            name="memo"
                                            value={formData.memo}
                                            onChange={handleInputChange}/>
                        </TodayInputWrap>
                    </TodayListWrap>
                </ChangeContainer>
            )}

            <TodayButton
                isActive={selectedDropDownValue !== ''}
                onClick={handleSave}
                content="저장"
            />
        </Container>
    )
}

export default CreateNewRecordPage;
