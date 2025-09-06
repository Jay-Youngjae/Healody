import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import TodayHeader from './../component/Today/TodayHeader';
import TodayNav from './../component/Today/TodayNav';
import { BsFillGearFill } from 'react-icons/bs';
import axios from 'axios';

const Family_care_detail = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const user = localStorage.getItem('userId');
  let now = new Date();
  const [formData, setFormData] = useState({
      userId : user,
      date : "232323",
      content : ""
  
  });

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  }

  const handleTask = () => {
    const requestBody = {
      userId: formData.userId,
      date: formData.date,
      content: formData.content,
    };
    axios('http://healody.shop/api/todo', {
      data:requestBody,
      method: 'POST',
    })
    .then(function(response) {
      alert('등록됨')
      console.log(response);

    })
    .catch(function(error) {
      console.log(error.response.status);
      console.log('에러');
    })
  }

  const host = 'http://15.165.115.39:8080';
  const token = localStorage.getItem('token');
  
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleToggleClick = () => {
    setShowOptions(!showOptions);
  };

  // const handleTaskChange = (event) => {
  //   setTask(event.target.value);
  // };

  // const addTask = () => {
  //   if (task.trim() !== '') {
  //     setTodos([...todos, { task, completed: false }]);

  //     // 요청 데이터 생성
  //     const requestData = {
  //       userId: 2, // 적절한 userId 값으로 변경
  //       date: "2023-08-15", // 적절한 날짜 값으로 변경
  //       content: task,
  //     };

      // POST 요청 보내기
  //     axios
  //       .post(host + '/api/care-user', requestData, {
  //         headers: {
  //           'Authorization': 'Bearer ' + token
  //         }
  //       })
  //       .then((response) => {
  //         console.log('할일 추가 요청 성공:', response.data);
  //       })
  //       .catch((error) => {
  //         console.error('할일 추가 요청 실패:', error);
  //       });

  //     setTask('');
  //   }
  // };


  const toggleComplete = (index) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index].completed = !updatedTodos[index].completed;
      return updatedTodos;
    });
  };

  const deleteTask = (index) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(index, 1);
      return updatedTodos;
    });
  };

  return (
    <div className="h-screen">
      <div className="w-360px max-w-lg">
        <TodayHeader />
        <TodayNav />

        {/* 돌봄 계정 상세 */}
        <div className="text-center ml-6 mr-6">
          {/* 돌봄 계정 프로필 */}
          <div className='border border-gray-300 rounded-xl p-2 bg-gray-100 mb-4'>
            <BsFillGearFill />
          </div>
          {/* 돌봄 계정 할일 목록 */}
          <div className="flex-col w-360px max-w-lg border border-gray-300 rounded-xl p-2 bg-gray-100">
            <header className="justify-between flex text-center mt-1 mb-3">
              <h1 className="text-sm text-white font-bold border rounded-3xl py-2 px-4 bg-purple-700">✓ 할일 목록</h1>
              <AiOutlinePlusCircle className="text-3xl text-purple-700 bold" />
            </header>
            <div className="mb-4">
              <input type="text" className="border border-gray-400 rounded p-2 w-full" placeholder="할일을 입력하세요..." name="content" value={formData.content} onChange={handleInputChange} />
              <button className="bg-purple-700 text-white py-2 px-4 rounded mt-2" onClick={handleTask}>추가</button>
            </div>
            {todos.length > 0 ? (
              <ul className="list-disc pl-8">
                {todos.map((todo, index) => (
                  <li key={index} className={`${todo.completed ? 'line-through text-gray-500' : ''}`} onClick={() => toggleComplete(index)}>
                    {todo.task}
                    <button className="text-red-500 ml-2" onClick={() => deleteTask(index)}>삭제</button>
                  </li>
                ))}
              </ul>
            ) : (<p className="text-center text-gray-500">할일 목록이 비어 있습니다.</p>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Family_care_detail;
