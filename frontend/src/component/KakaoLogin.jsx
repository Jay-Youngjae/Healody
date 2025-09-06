
import kakaobtn from "../img/kakaobtn.png";

function KakaoLogin() {
    const client_id='c33420b52702ac0ebf8805e80e6078f1';
    const redirect_uri= 'https://main.d1mqxw0kvb14tl.amplifyapp.com/loading';
     const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
    return(
       <>
        <a href={KAKAO_AUTH_URL} className="kakaobtn">
           <img 
               width="328"
               height="55"
               style={{margin: '0px 24px 16px 24px'}}
               src={kakaobtn} 
            />
        </a>
       </>
    );
}
export default KakaoLogin;

