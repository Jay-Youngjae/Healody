import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import '../css/button2.scss';
import styled from 'styled-components';

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

function CalendarCheckComponent() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [items, setItems] = useState({});

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
      userId : localStorage.getItem('yourid'),
      
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
      alert(localStorage.getItem('hisname')+"님의 일정이 조회되었습니다");
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
    <div style={{textAlign: "center",}}>
      <TodayGoalBox>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜 선택"
      />
      </TodayGoalBox>
      
      <button style={{
        border: '2px solid #333', 
        padding: '5px', 
        borderRadius: '5px', 
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)'
      }}
      class="btn btn-primary btn-jittery" onClick={handleAddSchedule}>일정 보기</button>
      <TodayBox>
      {Object.keys(items).map((key) => (
                  <TodayGoalBox>
                    <li style={{listStyle: "none",}} key={key}>
                        <Text>날짜:{`${items[key].date}`} 할일:{`${items[key].content}`}</Text>
                    </li>
                  </TodayGoalBox>
                    ))}
      </TodayBox>
    </div>
  );
}

export default CalendarCheckComponent;
