import React, { useState } from 'react';
import Navbar from '../../components/advisor/Navbar';
import CustomerKiosk from '../../components/advisor/CustomerKiosk';
import CustomerVideo from '../../components/advisor/CustomerVideo';
import CustomerWaiting from '../../components/advisor/CustomerWaiting';
import ToggleSwitch from '../../components/advisor/ToggleSwitch';
import styled from 'styled-components';

// 스타일 컴포넌트 정의
const AdvIndexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  background-color: #f4f4f9;
  overflow: hidden; /* 스크롤 제거 */
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  margin-top: 20px;
  overflow: hidden; /* 스크롤 제거 */
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 10px; /* 오른쪽 여백 추가 */
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: 10px; /* 왼쪽 여백 추가 */
  overflow: auto; /* 내용이 짤리지 않도록 스크롤 추가 */
`;

const NavComponents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

function AdvIndex() {
  // 방 상태와 상담원 상태를 관리하는 useState 훅
  const [rooms, setRooms] = useState([
    { id: 1, status: 'waiting' },
    { id: 2, status: 'waiting' },
    { id: 3, status: 'waiting' },
  ]);
  const [isAvailable, setIsAvailable] = useState(true);

  // 고객 요청을 처리하는 함수
  const handleCustomerRequest = () => {
    setRooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      const emptyRoomIndex = updatedRooms.findIndex((room) => room.status === 'waiting');
      if (emptyRoomIndex !== -1) {
        updatedRooms[emptyRoomIndex].status = 'requested';
      }
      return updatedRooms;
    });
  };

  // 고객이 연결되었을 때 상태를 업데이트하는 함수
  const handleCustomerConnected = (roomId) => {
    setRooms((prevRooms) => {
      return prevRooms.map((room) =>
        room.id === roomId ? { ...room, status: 'connected' } : room
      );
    });
  };

  // 고객 연결이 끊어졌을 때 상태를 업데이트하는 함수
  const handleCustomerDisconnected = (roomId) => {
    setRooms((prevRooms) => {
      return prevRooms.map((room) => (room.id === roomId ? { ...room, status: 'waiting' } : room));
    });
  };

  return (
    <AdvIndexWrapper>
      <NavComponents>
        <Navbar />
        <ToggleContainer>
          <ToggleSwitch isAvailable={isAvailable} setIsAvailable={setIsAvailable} />
          <p>연결 거절모드 토글</p>
        </ToggleContainer>
      </NavComponents>
      <MainContent>
        <LeftSection>
          <CustomerVideo />
          <CustomerWaiting rooms={rooms} setRooms={setRooms} />
        </LeftSection>
        <RightSection>
          <CustomerKiosk />
        </RightSection>
      </MainContent>
    </AdvIndexWrapper>
  );
}

export default AdvIndex;
