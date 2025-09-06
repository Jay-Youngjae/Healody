import React from "react";
import Email_pic from "../img/email.png";
function Email() {
    function handleClick(e) {
        window.location.href ="/login_page"
    }
    return (
        <img
            onClick={handleClick}
            alt="이메일 회원가입"
            src={Email_pic}
            width="328"
            height="55"
            style={{
                    margin: '0px 24px 16px 24px',
                    cursor: 'pointer',
                   }}
            
        />
    )
}

export default Email;