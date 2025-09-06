import React, { useState, useEffect } from "react";
import Header from "../component/Today/TodayHeader";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import threedot from '../img/threeDot.svg';
import {getDefaultLocale} from "react-datepicker";
import FamilyBox from "../component/FamilyBox";

const styles = {
    addBoxWrap: {
        width: '90%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '15px'
    },
    addBox:{
        border: '2px solid #6F02DB',
        width: '100%',
        padding: '15px 0'
    },
    titleWrap: {
        backgroundColor: '#6F02DB',
        padding: '5px 10px',
        fontSize: '14px',
        color: 'white',
        borderRadius: '15px',
        margin: '10px 0 0 0'
    },
    header: {
        backgroundColor: "transparent"
    },
    houseTopWrap: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    healodyLogo: {
        height: "38px",
        position: "relative",
        width: "98px"
    },

    input: { //엄마곰~
        color: "#000",
        display: "flex",
        border: "0.5px solid #000000",
        borderRadius: "10px",
        width: "100%",
        textAlign: "center",
        fontSize: "13px",
        fontWeight: 400,
        lineHeight: "40px",
    },

    purple_box: {
        width: "328px",
        height: "76px",
        fill: "#FFF",
        strokeWidth: "2px",
        stroke: "#6F02DB",
        marginTop: "116px",
        marginLeft: "16px"
    },

    box1: {
    },

    container: {
        width: '360px',
        margin: '0 auto',
    },
    box2: {
        width: "100%",
        padding: "5px 15px",
        borderRadius: "13px",
        marginTop: "15px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },

    houseBox:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    houseName:{
        fontSize: '15px',
        fontWeight: 'bolder',
        borderRadius: '10px',
        margin: '5px 0',
        width: '100%',
        border: '2px solid black',
        padding: '5px 10px',
    },
    h3: {
        fontSize: '18px',
        fontWeight: 'bolder'
    },

    box3: {
        display: "flex",
        height: "29px",
        width: "143.823px",
        border: "none",
        marginTop: "100px",
        marginLeft: "125px",

    },

    purple_box2: {
        border: "0.5px solid #B6B6B5",
        backgroundColor: "#6F02DB",
        display: "inline-flex",
        padding: "3px 12px",
        alignItems: "center",
        gap: "5px",
        borderRadius: "20px",
        marginTop: "20px",
        marginLeft: "16px",
    },

    purple_box3: {  //집 추가하기
        backgroundColor: "#6F02DB",
        width: '90%',
        color: 'white',
        margin: '20px auto',
        padding: '5px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '10px'
    },

    p: {
        color: "#000",
        fontFamily: "Pretendard",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "40px",
        marginTop: "-5px",
    },

    p2: {
        color: "#ffffff",
        fontSize: "13px",
    },

    p3: {
        color: "#B6B6B5",
        fontFamily: "Pretendard",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "40px",
        marginTop: "-5px",
    },

    p4: {
        display: "flex",
        width: "70px",
        height: "38px",
        flexDirection: "column",
        justifyContent: "center",
        color: "#000",
        textAlign: "center",
        fontSize: "23px",
        fontWeight: 600,
        marginLeft: "125px",
    },

    p5: {
        display: "flex",
        width: "132px",
        height: "34px",
        flexDirection: "column",
        justifyContent: "center",
        color: "#EF4444",
        textAlign: "center",
        fontSize: "13px",
        fontWeight: 600,
        marginLeft: "87px",
        marginTop: "-1px"
    },

    p6: {
        color: "#B6B6B5",
        textAlign: "center",
        fontFamily: "Pretendard",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: 600,
    },
    p7: {
        color: "#fff",
        textAlign: "center",
        fontFamily: "Pretendard",
        fontSize: "13px",
        fontStyle: "normal",
        fontWeight: 600,
        flexDirection: "column",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: "10px"
    },

    p8: {           //정말 탈퇴하시겠습니까?
        display: "flex",
        width: "292.82px",
        height: "46px",
        flexDirection: "column",
        justifyContent: "center",
        color: "#000",
        textAlign: "center",
        fontFamily: "Pretendard",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: 600,
    },

    p9: {         //탈퇴 취소

        width: "47.943px",
        height: "32px",
        flexShrink: 0,
        color: "#000",
        fontSize: "13px",
        fontWeight: 600,
    },

    p10: {
        display: "flex",
        width: "70px",
        height: "57px",
        flexDirection: "column",
        justifyContent: "center",
        color: "#000",
        textAlign: "center",
        fontSize: "13px",
        fontWeight: 600,
        marginLeft: "125px",
    },

    p11: {
        color: "#000",
        fontFamily: "Pretendard",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 700,
        marginTop: "80px",
        marginLeft: "-235px"
    },

    p12: {
        color: "#000",
        fontFamily: "Pretendard",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 700,
        marginTop: "10px",
        marginLeft: "-250px"
    },

    p13: {
        width: "200px",
        color: "#000",
        fontFamily: "Pretendard",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 700,
        marginTop: "13px",
        marginLeft: "51px",
    },

    total_box: {
    },

    ModifyModalBackdrop: {  //배경을 회색으로
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    ModifyModal: {  //삭제 박스
        width: '90%',
        height: '90vh',
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "13px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    CreateModalBackdrop: {  //배경을 회색으로
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    CreateModal: {  //삭제 박스
        width: "293px",
        height: "222px",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "13px",
        marginRight: "16px"
    },

    input2: {
        display: "flex",
        color: "#000",
        width: "132.442px",
        height: "34px",
        marginLeft: "80.71px",
        textAlign: "center",
        fontSize: "13px",
        fontWeight: 600,
        border: "none"
    },

    input3: {
        display: "flex",
        color: "#000",
        width: "200px",
        height: "22px",
        marginLeft: "30px",
        textAlign: "center",
        fontSize: "12px",
        fontWeight: 600,
        border: "none"
    },

    input_box: {
        width: "100%",
        textAlign: "center",
        padding: "5px",
        borderRadius: "13px",
    },

    input_box2: {
        border: "0.5px solid #000000",
        height: "88px",
        width: "311.82px",
        textAlign: "center",
        padding: "5px",
        borderRadius: "13px",
        marginLeft: "0px",
        marginRight: "34px"

    },

    input_complete: {
        border: "0.5px solid #000000",
        backgroundColor: "#6F02DB",
        height: "40px",
        width: "100%",
        textAlign: "center",
        padding: "5px",
        fontWeight: "bolder",
        borderRadius: "10px",
        marginTop: "50px",
        color: "white"
    },

    input_box3: {
        border: "0.5px solid #000000",
        backgroundColor: "#6F02DB",
        height: "40px",
        width: "100%",
        textAlign: "center",
        padding: "5px",
        fontWeight: "bolder",
        borderRadius: "10px",
        marginTop: "20px",
        color: "white"
    },

    input_box4: {
        border: "none",
        backgroundColor: "#FFF",
        display: "flex",
        height: "41px",
        width: "62px",
        textAlign: "center",
        marginTop: "-440px",
        marginLeft: "275px",
    },

    input_box5: {
        border: "none",
        backgroundColor: "#FFF",
        display: "flex",
        height: "41px",
        width: "62px",
        textAlign: "center",
        marginTop: "-430px",
        marginLeft: "275px",
    },

    input_box6: {
        border: "0.5px solid #B6B6B5",
        backgroundColor: "#FFF",
        height: "28px",
        width: "250px",
        padding: "3px 12px",
        textAlign: "center",
        borderRadius: "20px",
        marginTop: "20px",
        marginLeft: "10px"
    },

    deleteModalBackdrop: {  //배경을 회색으로
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    deleteModal: {  //삭제 박스
        width: "292.82px",
        height: "142.px",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "13px",
    },

    button1: {
        width: "106px",
        height: "32px",
        borderRadius: "13px",
        border: "0.5px solid #000",
        background: "var(--800, #111110)",
        marginTop: "10px",
        marginLeft: "35px",

    },

    button2: {
        width: "106px",
        height: "32px",
        flexShrink: 0,
        borderRadius: "13px",
        border: "0.5px solid #000",
        background: "var(--healody-white, #FFF)",
        marginLeft: "8px",
    },

    ellipse: {
        position: "relative",
        marginTop: "80px",
        marginLeft: "0px",
    },

    ellipse2: {
        position: "relative",
        marginTop: "6px",
        marginLeft: "-10px",
    },

    UserImg: {
        position: "absolute",
        marginLeft: "26px",
        marginTop: "-44px",
    },

    UserImg2: {
        position: "absolute",
        marginLeft: "27px",
        marginTop: "-54px",
    },
    camera: {
        position: "absolute",
        marginTop: "-31px",
        marginLeft: "47px",
    },
    modalBody: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontSize: '19px',
        fontWeight: 'bolder',
        margin: '15px 0 5px 0'
    },
    houseDetail:{
        margin: '5px 0',
        fontSize: '15px',
        fontWeight: '600'
    },
    houseList: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '10px',
        border: '1px solid black',
        padding: '15px 10px',
        margin: '5px 0',
        boxSizing: 'border-box'
    },
    dropdown:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
}

function MypageFamilyManagementMain() {

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [home, setHome] = useState('본가')
    const [home2, setHome2] = useState('')
    const [homeNameInput, setHomeNameInput] = useState("");
    const [showModifyModal2, setShowModifyModal2] = useState(false);
    const [family, setFamily] = useState('엄마')
    const [family2, setFamily2] = useState('')
    const [familyNameInput, setFamilyNameInput] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [create, setCreate] = useState('돌봄계정 추가하기')
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createNameInput, setCreateNameInput] = useState("");
    const [editHomeName, setEditHomeName] = useState('');
    const [editHomeInfo, setEditHomeInfo] = useState('');
    const [editHomeId, setEditHomeId] = useState('');

    const [submitUserName, onSubmitUserName] = useState('');
    const [editUserHomeId, setEditUserHomeId] = useState('');
    const [editUserId, setEditUserId] = useState([]);
    const [showUserModal, setShowUserModal] = useState(false);
    const [editCareUserId, setEditCareUserId] = useState([]);
    const [showCareUserModal, setShowCareUserModal] = useState(false);
    const [changeUserName, setChangeUserName] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [selectedHome, setSelectedHome] = useState('');

    const [familyList, setFamilyList] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        info: "",
    })

    const [editData, setEditData] = useState({
        name: '',
        info:'',
        home_id: ''
    })

    const [selectedFamily, setSelectedFamily] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleFamilySelect = (familyKey) => {
        setSelectedFamily(familyKey);
        setShowDropdown(false);
    };

    const onModifyClicked = () => {
        setShowModifyModal(true);
    };

    const [selectedHomeInfo, setSelectedHomeInfo] = useState({
        name: "",
        info: "",
        home_id: ""
    });
    useEffect(() => {
        // API 요청 보내기
        axios.get(`https://healody.shop/api/home/${userId}`)
            .then((response) => {
                const data = response.data.data;
                setFamilyList(data);
            })
    }, []);

    // console.log(selectedHomeInfo)

// threedot 클릭 시 모달 열기 이벤트 핸들러 수정
    const onEditClicked = (index) => () => {
        setEditHomeId(familyList[index].home.home_id)
        setEditHomeName(index)
        setEditHomeInfo(familyList[index].home.home_info)
        setShowEditModal(true);
    };

    const onEditUser = (index, users) => () => {
        // console.log(index, users)
        setEditUserHomeId(familyList[index].home.home_id)
        setEditUserId(users);
        setShowUserModal(true);
    }

    const cancelUserModel = () => {
        setShowUserModal(false);
    }

    const onEditCareUser = (index, users) => () => {
        // console.log(index, users)
        setEditUserHomeId(familyList[index].home.home_id)
        setEditCareUserId(users.id);
        setShowCareUserModal(true);
    }

    const cancelCareUserModel = () => {
        setShowCareUserModal(false);
    }

    const onSubmitEditUserName = (e) => {
        // const {name, value} = e.target;
        setChangeUserName(e.target.value);
    }

    const cancelEditClicked = () =>{
        setShowEditModal(false);
    }
    const onModifyClicked2 = () => {
        setShowModifyModal2(true);
    };

    const onCancelModify = () => {
        setShowModifyModal(false);
        setHomeNameInput("");
    };

    const onCancelModify2 = () => {
        setShowModifyModal2(false);
        setFamilyNameInput("");
    };

    const onConfirmModify = () => {
        setShowModifyModal(false);
        setHome(homeNameInput); // 완료 버튼을 눌렀을 때 home 값을 업데이트
        setHomeNameInput(""); // 입력값 초기화
    };

    const onConfirmModify2 = () => {
        setShowModifyModal2(false);
        setFamily(familyNameInput)
        setFamilyNameInput("")
    };

    const onSubmitHomeNameInput = (e) => { //집 이름 입력
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const onSubmitHome = (e) => {
        setHome(e.target.value);
    }
    const handleFamilySelected = (family) => {
        setSelectedHome(family);
        // console.log(selectedFamilyList[family].user)

        getFamilyList(family)
        setShowOptions(false); // 선택하기 버튼을 누르면 옵션 창을 닫도록 추가
    };

    function getFamilyList(family){
        setSelectedHome(family)
    }
    const onSubmitEditHome = (e) => {
        const {name, value} = e.target;
        setSelectedHomeInfo({...formData, [name]: value})
    }

    const onSubmitEditHomeInfo = (e) => {
        const {name, value} = e.target;
        setSelectedHomeInfo({...formData, [name]: value})
    }

    const deleteHome = async () => {
        axios({
            url: 'https://healody.shop/api/home/' + editHomeId,
            method: 'DELETE',
            header:{
                'Authorization': 'Bearer '+ token
            }
        }).then(function(response){
            window.location.reload()
        })
    }

    const deleteCareUser = async () => {
        axios({
            url: 'https://healody.shop/api/care-user/' + editCareUserId,
            method: 'DELETE',
            header:{
                'Authorization': 'Bearer '+ token
            }
        }).then(function(response){
            alert(response.data.message)
            window.location.reload()
        })
    }
    const submitHome = async () => {
        const requestBody = {
            name: editHomeName,
            info: editHomeInfo,
            home_id: editHomeId,
        };

        try {
            const response = await axios.patch(`https://healody.shop/api/home/${editHomeId}`, requestBody, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });

            console.log(requestBody)
            const { result, message } = response.data;
            if (result === 'SUCCESS') {
                alert(message)
                setShowEditModal(false);
                window.location.reload();
            } else if (result === 'FAILURE') {
                alert(message);
            }
        } catch (error) {
            console.error('집 정보 수정 요청 에러:', error);
        }
    }

    const onSubmitHomeInfo = (e) => { //집 설명 입력
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const onEditHomeInfo = (e) => { //집 설명 입력
        const {name, value} = e.target;
        setEditData({...formData, [name]: value});
    }

    const onChangeFamilyNameInput = (e) => {
        setFamilyNameInput(e.target.value);
    };

    const onSubmitFamily = (e) => {
        setFamily(e.target.value)
    }

    const onSubmitFamily2 = (e) => {
        setFamily2(e.target.value)
    }

    const onDeleteClicked = () => {
        setShowDeleteModal(true);
    };

    const onCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const onConfirmDelete = () => {  //삭제

        setShowDeleteModal(false);
    };
    const onCreateClicked = () => {
        setShowCreateModal(true);
    };

    const onCancelCreate = () => {
        setShowCreateModal(false);
    };

    const onConfirmCreate = () => {  //삭제
        setShowCreateModal(false);
        setCreate(createNameInput);
        setCreateNameInput("");
    };

    const onChangeCreateNameInput = (e) => {
        setCreateNameInput(e.target.value);
    };

    const closeModal = () => {
        setShowModifyModal(false);
    }

    const navigate = useNavigate();

    const handleToggleClick = () => {
        setShowOptions(!showOptions);
    };
    const handleFamilyInviteClick = () => {
        // 페이지 이동 처리
        navigate('/Mypage_FamilyInvite');
    };



    const createHome = async () => {
        const requestBody = {
            name: formData.name,
            info: formData.info,
        };
        try {
            const response = await axios.post('https://healody.shop/api/home', requestBody, {

            headers: {
                Authorization: 'Bearer ' + token
            }
            });

            const { result, message } = response.data;
            const homeId = response.data.homeId;
            if (result === 'CREATED') {
                localStorage.setItem('homeId', homeId)
                closeModal();
                alert(message);
                window.location.reload();
            } else if (result === 'FAILURE') {
                alert(message);
            }
        } catch (error) {
            console.error('집 생성 요청 에러:', error);
        }
    }

    const changeHome = async() => {
        const requestBody = {
            'userId': editUserId.id,
            'homeId': editUserHomeId
        }
        try{
            const response = await axios.post(`https://healody.shop/api/family/update/${familyList[selectedHome].home.home_id}`, requestBody,{
                headers: {
                    Authorization : 'Bearer ' + token
                }
            })
            alert(response.data.message)
        } catch(error){

        }
    }

    const deleteFamily = async () => {
        try{
            const response = await axios.delete(`https://healody.shop/api/family/delete/${editUserId.id}/${editUserHomeId}`, {
                headers: {
                    Authorization : 'Bearer ' + token
                }
            })
            alert(response.data.message)
        } catch(error) {

        }
    }

    return (
        <>
        <div style={styles.total_box}>
                <div style={styles.header}>
                    <Header />
                </div>

            <div style={styles.container}>
                <div>
                    {Object.keys(familyList).map((household) => (
                        <div style={styles.box2} key={household}>
                            <div style={styles.houseName}>
                                <div style={styles.houseTopWrap}>
                                    <p>{household}</p>
                                    <img
                                        id={familyList[household].home.home_id}
                                        src={threedot}
                                        onClick={onEditClicked(household)} // threedot 클릭 시 모달 열기
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                                <div style={styles.houseDetail}>{familyList[household].home.home_info}</div>
                            </div>
                            {
                                <>
                                    {
                                        Object.keys(familyList[household].user).map((userId) => (
                                            // <li>{familyList[household].user[userId].nickname}</li>
                                                <div style={styles.houseList}>
                                                    <p>{familyList[household].user[userId].nickname}</p>
                                                    <img
                                                        id={familyList[household].user[userId].id}
                                                        src={threedot}
                                                        onClick={onEditUser(household, familyList[household].user[userId])} // threedot 클릭 시 모달 열기
                                                        style={{ cursor: "pointer" }}
                                                    />
                                                </div>
                                        )
                                    )}
                                </>
                            }
                            <h3 style={styles.titleWrap}>돌봄계정</h3>
                            {
                                <>
                                    {
                                        Object.keys(familyList[household].careUser).map((userId) => (
                                                // <li>{familyList[household].user[userId].nickname}</li>
                                                <div style={styles.houseList}>
                                                    <p>{familyList[household].careUser[userId].nickname}</p>
                                                    <img
                                                        id={familyList[household].careUser[userId].id}
                                                        src={threedot}
                                                        onClick={onEditCareUser(household, familyList[household].careUser[userId])} // threedot 클릭 시 모달 열기
                                                        style={{ cursor: "pointer" }}
                                                    />
                                                </div>
                                            )
                                        )}
                                </>
                            }
                        </div>
                    ))}
                </div>
        </div>
            <div style={styles.addBoxWrap}>
                <button style={styles.addBox} onClick={onModifyClicked}>
                    집 추가하기
                </button>
            </div>

            {showEditModal && (
                <div style={styles.ModifyModalBackdrop}>
                    <div style={styles.ModifyModal}>
                        <div style={styles.modalBody}>
                            <p style={styles.title}>집 이름 수정하기</p>
                            <div style={styles.input_box}>
                                <input
                                    name="name"
                                    type="text"
                                    value={editHomeName}
                                    style={styles.input}
                                    onChange={(e) => setEditHomeName(e.target.value)}
                                    placeholder="집의 이름을 입력해주세요."
                                />

                            </div>

                            <p style={styles.title}>집 설명 수정하기</p>
                            <div style={styles.input_box}>
                                <input
                                    name="info"
                                    type="text"
                                    value={editHomeInfo}
                                    style={styles.input}
                                    onChange={(e) => setEditHomeInfo(e.target.value)}
                                    placeholder="집에 대한 설명을 입력해주세요."
                                />
                            </div>


                            <button style={styles.input_complete} onClick={submitHome}>
                                완료
                            </button>
                            <button style={styles.input_box3} onClick={deleteHome}>
                                삭제
                            </button>
                            <button style={styles.input_box3} onClick={cancelEditClicked}>
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
                {showModifyModal && (
                            <div style={styles.ModifyModalBackdrop}>
                                <div style={styles.ModifyModal}>
                                    <div style={styles.modalBody}>
                                        <p style={styles.title}>집 이름 입력</p>
                                        <div style={styles.input_box}>
                                            <input
                                                name="name"
                                                type="text"
                                                value={formData.name}
                                                style={styles.input}
                                                onChange={onSubmitHomeNameInput}
                                                placeholder="생성할 집의 이름을 입력해주세요."
                                            />
                                        </div>

                                        <p style={styles.title}>집 설명 입력</p>
                                        <div style={styles.input_box}>
                                            <input
                                                name="info"
                                                type="text"
                                                value={formData.info}
                                                style={styles.input}
                                                onChange={onSubmitHomeInfo}
                                                placeholder="집에 대한 설명을 입력해주세요."
                                            />
                                        </div>


                                        <button style={styles.input_complete} onClick={createHome}>
                                            완료
                                        </button>
                                        <button style={styles.input_box3} onClick={closeModal}>
                                            취소
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}


            {showUserModal && (
                <div style={styles.ModifyModalBackdrop}>
                    <div style={styles.ModifyModal}>
                        <div style={styles.modalBody}>
                            <p style={styles.title}>이름 수정하기</p>
                            <div style={styles.input_box}>
                                <input
                                    name="name"
                                    type="text"
                                    value={editUserId.name}
                                    style={styles.input}
                                />
                            </div>

                            <p style={styles.title}>집 이동하기</p>

                            <button
                                className="bg-purple-600 text-white py-2 px-4 rounded-3xl"
                                style={{ backgroundColor: "#6F02DB" }}
                                onClick={handleToggleClick}
                            >
                                { selectedHome } ▽

                            </button>
                            {showOptions && (
                                <div className="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-40 flex items-center justify-center">
                                    <div className="w-60 flex flex-col bg-white p-6 rounded-2xl">
                                        {Object.keys(familyList).map((key) => (
                                            <button
                                                className="text-black py-2 px-4 rounded-3xl rounded-lg border border-gray-300 w-full my-2"
                                                onClick={() => handleFamilySelected(key)}
                                                key={key}
                                            >
                                                {key}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button style={styles.input_complete} onClick={changeHome}>
                                이동하기
                            </button>
                            <button style={styles.input_box3} onClick={deleteFamily}>
                                삭제하기
                            </button>
                            <button style={styles.input_box3} onClick={cancelUserModel}>
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showCareUserModal && (
                <div style={styles.ModifyModalBackdrop}>
                    <div style={styles.ModifyModal}>
                        <div style={styles.modalBody}>
                            <button
                                style={styles.input_complete}
                                onClick={() => {
                                    navigate('/care_today',{
                                        state : {
                                            id: editCareUserId
                                        }
                                    } );
                                }}>
                                돌봄 계정 페이지 보러가기
                            </button>
                            <button style={styles.input_box3} onClick={deleteCareUser}>
                                삭제하기
                            </button>
                            <button style={styles.input_box3} onClick={cancelCareUserModel}>
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

        </>
      );
}

export default MypageFamilyManagementMain;