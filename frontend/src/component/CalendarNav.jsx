import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';

const Container = styled.div`
  margin: 10px auto 0 auto;
  display: grid;
//   grid-template-columns: 180px 180px;
  text-align: center;
  width: 100%;
`

const TabLink = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.isActive ? '#000' : '#B6B6B5'};
  padding: 10px 5px;
  border-radius: 5px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${props => props.isActive ? '2px' : '0'};
    background-color: ${props => props.isActive ? '#000' : 'transparent'};
  }
`

const CalendarNav = () => {
    const location = useLocation();

    
    const isHospitalActive = location.pathname.includes('/hospital');
    

    return (
        <Container>
            
            <TabLink
                to="/hospital"
                isActive={isHospitalActive}
            >
                일정추가 및 가족 일정 조회
            </TabLink>
        </Container>
    )
}

export default CalendarNav;