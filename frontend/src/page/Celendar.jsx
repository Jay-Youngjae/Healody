import React from "react";
import TodayHeader from "../component/Today/TodayHeader";
import TodayNav from "../component/Today/TodayNav";
import CalendarNav from "../component/CalendarNav";
import styled from 'styled-components';
import { Container } from "postcss";

function Celendar() {
    const Container = styled.div`
        width: 360px;
        margin: 0 auto;
        position: relative;
        `;
    return (
        <>
        <Container>
            <TodayHeader />
            <TodayNav />
            <CalendarNav />
        </Container>
        </>
    )
}

export default Celendar;