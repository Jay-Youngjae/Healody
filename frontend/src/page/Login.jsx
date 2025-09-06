import React from "react";
import LoginLogo from "../img/login_logo.png"
import KakaoLogin from "../component/KakaoLogin";
import Idpw from "../component/Idpw";
import Email from "../component/Email";
import { Container } from "postcss";

const styles= {
    l_logo: {
        width: 226,
        height: 108,
       
    },

    logo_space: {
        // textAlign: 'center',
        marginTop: 150,
        marginLeft: "60px",
    },
    kakaobtn_cage: {
        width: "100%",
        textAlign: 'center',
        
    },
    idpw_cage: {
        width: "100%",
        textAlign: 'center',
    },
    email_cage: {
        width: "100%",
        textAlign: 'center',
        
    },

    login_box: {
        height: "100%",
        marginTop: "300px",
    },
    all: {
        margin: "0 auto",
        position: "relative",
        width: "360px",
    }
    
}


function Login() {
    return (
        <>
        <div style={styles.all}>
        
            <div style={styles.logo_space}>
                <img
                    src={LoginLogo}
                    style={styles.l_logo}
                />
            </div>
               
        
        <div style={styles.login_box}>
            <div style={styles.kakaobtn_cage}>
                <KakaoLogin />
            </div>
                
            <div style={styles.idpw_cage}>
                <Email />
            </div>

            <div style={styles.email_cage}>
                <Idpw />
            </div>
        </div>
        </div>
        </>
    )
}

export default Login;