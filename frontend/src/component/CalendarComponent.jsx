// import React, { useState } from 'react';



// function CalendarComponent() {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   // const [showModal, setShowModal] = useState(false);
//   // const [eventTitle, setEventTitle] = useState('');
//   // const [events, setEvents] = useState([]);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   // const handleEventTitleChange = (e) => {
//   //   setEventTitle(e.target.value);
//   // };

//   // const handleEventSubmit = () => {
//   //   if (eventTitle.trim() !== '') {
//   //     setEvents([...events, { date: selectedDate, title: eventTitle }]);
//   //     setEventTitle('');
//   //     setShowModal(false);
//   //   }
//   // };

//   const styles={
//     calendarContainer: {
//       margin: "20px auto",
//       maxWidth: "600px",
//       boxShadow: "0 0 10px rgba(0,0,0,0.2)",
//       borderRadius: "10px",
//       overflow: "hidden",
//       textAlign: "center",
//     },
//     but: {
//       margin: "10px",
//       padding: "8px 12px",
//       fontSize: "16px",
//       cursor: "pointer",
//       backgroundColor: "#007bff",
//       color: "#fff",
//       border: "none",
//       borderRadius: "5px",
//     },

//   }

//   return (
//     <div>
//       <div style={styles.calendarContainer}>
//         <Calendar onChange={handleDateChange} value={selectedDate} />
//       </div>

//       {/* <CalendarAddList /> */}
//     </div>
//   );
// }

// export default CalendarComponent;

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

function CalendarComponent({ onAddSchedule }) {
  const [schedule, setSchedule] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleInputChange = (e) => {
    setSchedule(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    
  };

  const handleAddSchedule = () => {
    if (schedule.trim() !== '' && selectedDate !== null) {
      onAddSchedule({ date: selectedDate, text: schedule });
      const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
      localStorage.setItem('date', formattedDate);
      localStorage.setItem('do',schedule);
      setSchedule('');
      setSelectedDate(null);
    }
    const requestBody = {
      
      date : localStorage.getItem('date'),
      content : localStorage.getItem('do'),
    };
    axios('https://healody.shop/api/todo', {
      data: requestBody,
      method: 'POST',
    })
    .then(function(response) {
      alert(localStorage.getItem('hisname')+"님의 일정이 추가되었습니다")
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    })
  };

  const user_id = localStorage.getItem('userId');

  // 유저 정보 받아오기
  // const handleFamily = () => {
  //    axios(`https://healody.shop/api/home/${user_id}`, {
  //       method: 'GET',
  //    })
  //    .then(function(response) {
  //     alert('가족구성원 조회가 되었습니다.');
  //     const Item = response;
  //     for(const key in Object.keys(Item)) {
  //       console.log(Item[key].user);
  //       //일단 콘솔만 찍게 해뒀고 나중에 map함수로 나타내야함
  //     }
  //    })
  //    .catch(function(error) {
  //     console.log(error.response.status);
  //    })
  // }

  



  return (
    <div style={{textAlign: "center",
                  
                  }}>
      <TodayBox>
        <div style={{borderRadius: '5px',
         backgroundColor: "rgb(87, 108, 228)",
         width: "100px",
         fontSize: "14px",
         color: "white",
         padding: '1px',}}>
          일정 추가
        </div>
      <TodayGoalBox>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜 선택"
      />
      </TodayGoalBox>
      <TodayGoalBox>
      <input
        type="text"
        placeholder="일정 추가"
        value={schedule}
        onChange={handleInputChange}
      />
      </TodayGoalBox>
      <br />
      <TodayGoalBox style={{height: "40px",
                            width: "200px",
                            textAlign: "center",}}>
      <button style={{marginTop: "-3px",}} class="btn btn-primary btn-jittery" onClick={handleAddSchedule}>일정 추가하기</button>
      </TodayGoalBox>
      </TodayBox>
      {/* <div class="buttons">
      <button class="btn btn-primary btn-jittery">
        Click Me
      </button>
      <button class="btn btn-primary loading">Loading</button>
  <button class="btn btn-primary btn-ghost">Ghost</button>
  <button class="btn btn-primary">
    <div class="inline-flex items-center space-x-2">
      <i class="plus-icon"></i>
      <div>Icon</div>
    </div>
  </button>
  <button class="btn btn-primary btn-dashed">Dashed</button>
  <button class="btn btn-primary btn-link">Link</button>
      </div> */}

<div class="buttons">
  
  
  
 
 
</div>
    </div>

    
  );
}

export default CalendarComponent;
