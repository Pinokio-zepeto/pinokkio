import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CarouselPageStyle = styled.div`
  padding-top: 700px;
  display: flex;
  flex-direction: row;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const StyledButton = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ButtonBackBox = styled.div`
  position: absolute;
  border: 1px solid black;
  border-radius: 10px;
  margin-top: 9px;

  height: 100px;
  width: 90px;
`;

const ButtonFrontBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 10px;
  font-size: 30px;
  cursor: pointer;
  font-family: 'PeoplefirstNeatLoudTTF';
  background-color: #eeeeee;
  z-index: 1;

  @font-face {
    font-family: 'PeoplefirstNeatLoudTTF';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2406-2@1.0/PeoplefirstNeatLoudTTF.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`;

const ButtonInnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  border-radius: 6px;
  background-color: #eeeeee;
  &:hover {
    background-color: #add8e6;
  }
`;

function CarouselPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  // useEffect(() => {
  //   /* 여기서부터 SSE 관련 코드 */
  //   // SSE 연결 생성
  //   const eventSource = new EventSource('http://localhost:8080/api/face-recognition-events');

  //   // 서버로부터 메시지를 받았을 때 실행될 핸들러
  //   eventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log('Received SSE data:', data);
  //     // 받은 데이터로 상태 업데이트
  //     setResult(data);
  //   };

  //   // 에러 발생 시 실행될 핸들러
  //   eventSource.onerror = (error) => {
  //     console.error('SSE error:', error);
  //     eventSource.close();
  //   };

  //   return () => {
  //     // 컴포넌트 언마운트 시 SSE 연결 종료
  //     eventSource.close();
  //   };
  // });

  // 결과가 없을 때 표시할 내용

  const havingHere = () => {
    navigate('/kiosk/menu', { state: { where: 'having here' } });
  };

  const takeAway = () => {
    navigate('/kiosk/menu', { state: { where: 'take away' } });
  };

  return (
    <CarouselPageStyle>
      {result ? (
        <div>
          <h2>얼굴 인식 결과:</h2>
          <p>회원 여부: {result.is_member ? '회원' : '비회원'}</p>
          <p>나이: {result.age}</p>
          <p>성별: {result.gender}</p>
          {result.is_member && result.member_info && (
            <div>
              <h3>회원 정보:</h3>
              <p>ID: {result.member_info.id}</p>
              <p>등록된 나이: {result.member_info.age}</p>
              <p>등록된 성별: {result.member_info.gender}</p>
            </div>
          )}
        </div>
      ) : (
        <div>얼굴 인식 결과를 기다리는 중...</div>
      )}
      <ButtonContainer>
        <StyledButton>
          <ButtonFrontBox onClick={havingHere}>
            <ButtonInnerBox>매장</ButtonInnerBox>
          </ButtonFrontBox>
          <ButtonBackBox />
        </StyledButton>
        <StyledButton>
          <ButtonFrontBox onClick={takeAway}>
            <ButtonInnerBox>포장</ButtonInnerBox>
          </ButtonFrontBox>
          <ButtonBackBox />
        </StyledButton>
      </ButtonContainer>
    </CarouselPageStyle>
  );
}

export default CarouselPage;
