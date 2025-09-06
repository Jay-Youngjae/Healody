import React, {useEffect, useState} from "react";
import TodayHeader from "../component/Today/TodayHeader";
import TodayNav from "../component/Today/TodayNav";
import CalendarNav from "../component/CalendarNav";
import CalendarComponent from "../component/CalendarComponent";
import TodayDropDown from "../component/Today/TodayDropDown";
import Select from "../component/Select";
import styled from 'styled-components';
import CalendarAddList from "../component/CalendarAddList";
import CalendarCheckComponent from "../component/CalendarCheckComponent";
import axios from 'axios';
import '../css/button.css';
import '../css/button2.scss';


const HospitalSelectWrap = styled.div`
  margin-top: 0;
`

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

function Hospital() {
    // const optionsHome = ['나', '엄마', '아빠', '동생'];
    // const optionsHome2 = ['고모', '고모부', '사촌형', '사촌동생'];
    // const optionsHome3 = ['이모', '이모부', '사촌누나', '사촌동생'];
    // const [choose, setChoose] = useState(null);

    // const handleOptionChange = (option) => {
    //     setChoose(option);
    // };

    const Container = styled.div`
        width: 360px;
        margin: 0 auto;
        position: relative;
        `;
    
    
    const [schedules, setSchedules] = useState([]);
    const handleAddSchedule = (newSchedule) => {
        setSchedules([...schedules, newSchedule]);
    };
    const [selectedName, setSelectedName] = useState(null);
    const [selectUserId, setSelectUserId] = useState();
    const [items, setItems] = useState({});

    const handlenameClick  = (name, userid) => {
        setSelectedName(name);
        setSelectUserId(userid);
        localStorage.setItem('yourid',userid);
        localStorage.setItem('hisname',name);
    };

    const handleFamily = () => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios('https://healody.shop/api/calender/view', {
            method: 'GET',
        })
        .then(function(response) {
            alert('가족조회가 되었습니다.');
            const data = response.data.data;
            const newData ={};
            data.forEach((item, index) => {
                newData[`item${index+1}`] = item;
            });
            setItems(newData);
                // const newData = {};
                // data.forEach((item, index) => {
                //     newData[`item${index+1}`] = item;
                // });
                // setItems(newData);
            console.log(newData);
        })
        .catch(function(error) {
            console.log(error)
        })
    }

    return (
        <>
            <Container>
                <TodayHeader />
                <TodayNav />
                <CalendarNav />
                <h1 style={{
                    textAlign: "center",
                }}>
                    <div class="btn btn-primary btn-round btn-marquee">
                        <span data-text="자신의 일정을 추가해보세요!">자신의 일정을 추가해보세요!</span>
                    </div>
                </h1>
                <br />
                <CalendarComponent onAddSchedule={handleAddSchedule} />
                {/* <ul>
                    {schedules.map((schedule, index) => (
                        <li key={index}>
                            <strong>날짜:</strong> {schedule.date.toLocaleDateString()}
                            <strong>일정:</strong> {schedule.text}
                        </li>
                    ))}
                </ul> */}
                <br />
                <div style={{width: "450px",
                            textAlign:"center",
                            marginLeft: "-40px",
                            }}
                            class="btn btn-primary btn-round btn-marquee">
                        <span data-text="가족을 선택하고 날짜를 선택하여 일정을 조회해 보세요!">가족을 선택하고 날짜를 선택하여 일정을 조회해 보세요!</span>
                    </div>
                
                <TodayBox>
                <div style={{borderRadius: '5px',
                    backgroundColor: "rgb(87, 108, 228)",
                    width: "100px",
                    fontSize: "14px",
                    color: "white",
                    padding: '1px',
                    textAlign: "center",}}>
                    가족 조회
                    </div>
                <div style={{textAlign:"center",}}>
                    <button style={{border: '2px solid #333', 
                    padding: '5px', 
                    borderRadius: '5px', 
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)'
                        }}
                    class="btn btn-primary btn-ghost btn-open-line" onClick={handleFamily}>가족 조회하기</button>
                </div>
                
                <ul>
                <div style={{textAlign: "center",}}>
                {Object.keys(items).map((key) => (
                    <li key={key}>
                        <button 
                            class="custom-btn btn-3"
                            onClick={() => handlenameClick(items[key].name, items[key].userId)}
                            ><span>{`${items[key].name}`}</span>
                        </button>
                    </li>
                    ))}
                </div>
                    {/* <h3>선택한이름: {selectedName}</h3> */}
                </ul>
                
                <br />
                {/* 일정이 나오는 컴포넌트 */}

                <CalendarCheckComponent />
                </TodayBox>
            
            </Container>
        </>
    )
}

export default Hospital;