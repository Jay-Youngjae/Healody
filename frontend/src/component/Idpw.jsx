import React from "react";
import Id_pic from "../img/id_pw.png";

function Idpw() {
    function handleClick(e) {
        window.location.href = "/join_page"
    
 }    
 return (
        <img 
            onClick={handleClick}
            alt="아이디로그인"
            src={Id_pic}
            width="328"
            height="55"
            style={{
                    margin: '0px 24px 16px 24px',
                    cursor: 'pointer',
            }}
        />
    )
}

export default Idpw;