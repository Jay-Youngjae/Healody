import React, { useState } from "react";


const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [nameMessage, setNameMessage] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')

    const [isName, setIsName] = useState(false)
    const [isEmail, setIsEmail] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
    
 

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     try {
    //       axios
    //         .post(REGISTER_USERS_URL, {
    //           username: name,
    //           password: password,
    //           email: email,
    //         })
    //         .then((res) => {
    //           console.log('response:', res);
    //           if (res.status === 200) {
    //             router.push('/sign_up/profile_start');
    //             // 다음으로 이동할 페이지 주소
    //           }
    //         });
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };
    



      //이름 유효성 검사
      const onSubmitName = (e) => {
        setName(e.target.value);
        if (e.target.value.length < 2 || e.target.value.length > 5) {
          setNameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
          setIsName(false);
        } else {
          setNameMessage('올바른 이름 형식입니다 :)');
          setIsName(true);
        }
      }; 


      // 이메일 유효성 검사
      const onSubmitEmail = (e) => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        
        const emailCurrent = e.target.value;
        setEmail(emailCurrent);

        if(!emailRegex.test(emailCurrent)) {
            setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해줘요');
            setIsEmail(false);
        }else {
            setEmailMessage('올바른 이메일 형식이에요');
            setIsEmail(true);
        }
        };


        //비밀번호 유효성 검사
        const onSubmitPassword = (e) => {
            const passwordRegex = 
                /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
            const passwordCurrent = e.target.value;
            setPassword(passwordCurrent);

            if(!passwordCurrent.test(passwordRegex)) {
                setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
               setPassword(false)
            } else {
            setPasswordMessage('안전한 비밀번호에요!')
            setIsPassword(true)
            }
            };
        
      const onSubmitPasswordConfirm = (e) => {
        const passwordConfirmCurrent = e.target.value;
        setPasswordConfirm(passwordConfirmCurrent);

        if(password == passwordConfirmCurrent) {
            setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요')
            setPasswordConfirm(true)
        } else{
            setPasswordConfirmMessage('비밀번호가 틀려요 다시 입력해주세요')
            setPasswordConfirm(false)
        }
      };

      return (
        <>
        <div className="formbox">
          <input text="이름" type="text" typeName="name" onChange={onSubmitName} />
          {name.length > 0 && <span className={`message ${isName ? 'success' : 'error'}`}>{nameMessage}</span>}
        </div>

        </>
      );
}

export default SignUp;