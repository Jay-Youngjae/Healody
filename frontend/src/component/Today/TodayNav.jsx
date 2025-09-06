import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';

const Container = styled.div`
  margin: 10px auto 0 auto;
  display: grid;
  grid-template-columns: 120px 120px 120px;
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

const TodayNav = () => {
    const location = useLocation();

    const isTodayActive = location.pathname.includes('/my_today');
    const isFamilyActive = location.pathname.includes('/family');
    const isCalendarActive = location.pathname.includes('/calendar');

    return (
        <Container>
            <TabLink
                to="/my_today"
                isActive={isTodayActive}
            >
                오늘의 나
            </TabLink>
            <TabLink
                to="/family"
                isActive={isFamilyActive}
            >
                내 가족
            </TabLink>
            <TabLink
                to="/calendar"
                isActive={isCalendarActive}
            >
                달력
            </TabLink>
        </Container>
    )
}

export default TodayNav;
