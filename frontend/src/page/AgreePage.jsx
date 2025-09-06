import React, { useState } from "react";
import AgreeBox from "../component/AgreeBox";
import BackIcon from "../img/back_icon.png";
import { AiOutlineCheck } from 'react-icons/ai';
import Nextfalse from "../img/next_false.png";
import Nexttrue from "../img/Next_true.png";

const styles={
    img: {
        marginTop: "10px",
        marginLeft: "-10px",
    },
    firstComment: {
        fontSize: "24px",
        lineHeight: "32px",
        fontWeight: "bold",
        marginLeft: "20px",
        marginTop: "20px",
    },
    firstbox: {
        marginTop: "40px",
    },
    false: {
        
        textAlign: "center",
    },
    under: {
        position: "fixed",
        bottom: 0,
        textAlign: "center",
    },
    label: {
        float: "left",
        marginLeft: "30px",
        marginBottom: "10px",
    }
}
function AgreePage() {
    const [agree, setAgree ] = useState(false);
    const [agree1, setAgree1 ] = useState(false);
    const [allAgree, setAllAgree] = useState(false);
    const [imag, setImag] = useState(Nextfalse);

    const handleAgreeChange = (event) => {
        setAgree(event.target.checked);

        if (agree1 && agree) {
            setImag(Nextfalse);
        }
        else{
            setImag(Nexttrue);
        }
    };
    const handleAgreeChange1 = (event) => {
        setAgree1(event.target.checked);

        if (agree1 && agree) {
            setImag(Nextfalse);
        }
        else {
            setImag(Nexttrue);
        }
    };

    const handleAgreeAll = (event) => {
        setAgree(event.target.checked);
        setAgree1(event.target.checked);
        setAllAgree(event.target.checked);

        if (agree1 && agree) {
            setImag(Nextfalse);
        }
        else {
            setImag(Nexttrue);
        }
    };

    const ChangeImg = () => {
        if (agree1 && agree) {
            setImag(Nexttrue);
        }
        else{
            setImag(Nextfalse);
        }
    };


    return (
    <>
    <img style={styles.img} src={BackIcon} />
    <div style={styles.firstComment}>
        힐로디 이용을 위해<br />
        약관 동의가 필요해요!
    </div>
    <div style={styles.firstbox}>
        <AgreeBox message1="(필수) 개인정보 수집 및 이용에 동의합니다." message2="개인정보 수집 및 이용에 동의하는 내용" agree={agree} onAgreeChange={handleAgreeChange} />
    </div>

    <div style={styles.firstbox}>
        <AgreeBox message1="(필수) 이용약관에 동의합니다." message2="개인정보 수집 및 이용에 동의하는 내용" agree={agree1} onAgreeChange={handleAgreeChange1} />
    </div>

    <div style={styles.under}>
        <label style={styles.label}>
            <input type="checkbox" checked={allAgree} onClick={handleAgreeAll} />
            <span>
            {agree && <AiOutlineCheck />}
            </span>
            약관 전체동의
            
        </label>

        <img style={styles.false} src={imag} onChange={handleAgreeAll} onClick={() => window.location.href = '/my_today'}/>
    </div>
    </>
    
    );
}

export default AgreePage;