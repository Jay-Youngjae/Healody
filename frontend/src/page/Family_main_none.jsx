import React, { useState } from 'react';
import TodayHeader from './../component/Today/TodayHeader';
import TodayNav from './../component/Today/TodayNav';

const Family_main_none = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="h-screen">
      <div className="w-360px max-w-lg">
      <TodayHeader/>
          <TodayNav />
        {/* Centered Box */}
        <div className="bg-white rounded-lg border border-gray-300 p-10 mt-8 ml-6 mr-6"> {/* 여기에 mb-16 추가 */}
          <div className="text-center">
            <p className="text-gray-600">
              아직 내 집을 만들거나 초대받지 못했어요! 마이페이지에서 내 집을 만들고 가족들과 함께 건강을 기록하고 공유해봐요
            </p>
            <button className="bg-purple-600 text-white py-3 px-6 rounded-md mt-4" style={{ borderRadius: '15px' }}>
              마이페이지 바로가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Family_main_none;