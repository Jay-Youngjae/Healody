import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import styled from 'styled-components';
import TodayGoalTitle from "./TodayGoalTitle";
import TodayPlusBt from './../../img/TodayPlusBt.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import '../../css/button.css';

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

const Button = styled.button`
  width: 90%;
  margin: 0 auto;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid #787878;
  padding: 10px 0;
`

function TodayDoBox() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [items, setItems] = useState({});

    const navigate = useNavigate();
    function onMoveLink(){
        navigate('/calendar');
    }
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

      const handleAddSchedule = () => {
        if (selectedDate !== null) {
          // const token = localStorage.getItem('token');
          // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
          localStorage.setItem('memodate', formattedDate);
          setSelectedDate(null);
        }
        const requestBody = {
          userId : localStorage.getItem('userId'),
          
          date: localStorage.getItem('memodate').toString(),
        };
    
        // const requestBody = {
        //   "userId" : "5",
        //   "date" : "2023-09-06"
        // };
        axios(`https://healody.shop/api/calender/todo/${requestBody.userId}/${requestBody.date}`, {
          method: 'GET',
        })
        .then(function(response) {
          alert(localStorage.getItem('nickname')+"님의 일정이 조회되었습니다");
          console.log(response);
          const data = response.data.data;
          const newData ={};
          data.forEach((item, index) => {
            newData[`item${index+1}`] = item;
          });
          setItems(newData);
          console.log(newData);
        })
        .catch(function(error) {
          console.log(error);
          console.log(requestBody);
        })
        //여기다 이제 날짜 정보를 주고 axios로 그날의 일정 받아오기
      };
    

    return (
        <TodayBox>
            <TodayMainTopWrap>
                <TodayGoalTitle content={ "내 할일" } width={ "90" }/>
                <MoreBt src={TodayPlusBt} onClick={onMoveLink}/>
                
            </TodayMainTopWrap>
            <DatePicker style={{ display: 'flex', justifyContent: 'center'}}
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="날짜 선택해서 일정 보기!"
            />
            <div class="frame">
                <Button onClick={handleAddSchedule}><span>이날의 일정 보기</span></Button>
            </div>

            
            {Object.keys(items).map((key) => (
                    <li style={{listStyle: "none"}}key={key}>
                        <TodayGoalBox>
                            <Text>날짜:{`${items[key].date}`} 할일:{`${items[key].content}`}</Text>
                        </TodayGoalBox>
                    </li>
                    ))}
        </TodayBox>
    )
}

export default TodayDoBox;