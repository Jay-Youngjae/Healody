import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import Modal from 'react-modal';
import TodayRecordTypeButton from "./Today/TodayRecordTypeButton";
Modal.setAppElement('#root');

const TodayRecordBoxWrap = styled.div`
  margin-top: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #F5F5F5;
  border-radius: 10px;
  border: 1px solid #B6B6B5;
  padding: 10px;
`;

function CalendarAddList({ options }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [events, setEvents] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleEventTitleChange = (e) => {
        setEventTitle(e.target.value);
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleEventSubmit = () => {
        if (eventTitle.trim() !== '') {
            setEvents([...events, { date: selectedDate, title: eventTitle }]);
            setEventTitle('');
            setShowModal(false);
        }
    };

    const styles = {
        margin: {
            margin: "5px 0"
        },
        but: {
            marginTop: "15px",
            padding: "5px 12px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#6F02DB",
            color: "white",
            border: "none",
            borderRadius: "20px",
        },
        in: {
            backgroundColor: "grey",
        }
    };

    return (
        <>
            <button style={styles.but} onClick={() => setShowModal(true)}>일정 추가</button>

            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <h2>일정 추가</h2>
                <div>
                    <label>일정 제목: </label>
                    <input
                        style={styles.in}
                        type="text"
                        value={eventTitle}
                        onChange={handleEventTitleChange}
                    />
                </div>
                <button style={styles.but} onClick={handleEventSubmit}>추가</button>
                <button style={styles.but} onClick={() => setShowModal(false)}>취소</button>
            </Modal>

            {events.length > 0 && (
                <TodayRecordBoxWrap>
                    <ul>
                        {events.map((event, index) => (
                            <div style={styles.margin}>
                                <TodayRecordTypeButton key={index} content={`${event.date.toDateString()} - ${event.title}`} />
                            </div>
                        ))}
                    </ul>
                </TodayRecordBoxWrap>
            )}
        </>
    )
}

export default CalendarAddList;
